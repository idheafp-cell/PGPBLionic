import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/images/marker-icon-2x.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-editpoint',
  templateUrl: './editpoint.page.html',
  styleUrls: ['./editpoint.page.scss'],
  standalone: false,
})
export class EditpointPage implements OnInit {
  map!: L.Map;
  key = '';
  name = '';
  coordinates = '';
  description = '';

  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private dataService = inject(DataService);
  // App is zoneless: refresh the view after Firebase / Leaflet updates
  private cdr = inject(ChangeDetectorRef);
  constructor() { }

  async ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key') || '';

    const point: any = await this.dataService.getPoint(this.key);
    this.name = point.name;
    this.coordinates = point.coordinates;
    this.description = point.description || '';
    this.cdr.markForCheck();

    const latLng = point.coordinates.split(',').map((c: string) => parseFloat(c)) as L.LatLngExpression;

    setTimeout(() => {
      // Load map
      this.map = L.map('mapedit').setView(latLng, 13);

      var osm =
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

      // Esri World Imagery
      var esri =
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'ESRI'
        });

      osm.addTo(this.map);

      // Layer control
      var baseMaps = {
        "OpenStreetMap": osm,
        "Esri World Imagery": esri
      };

      L.control.layers(baseMaps).addTo(this.map);

      var tooltip = 'Drag the marker or move the map<br>to change the coordinates<br>of the location';
      var marker = L.marker(latLng, { draggable: true });
      marker.addTo(this.map);
      marker.bindPopup(tooltip);
      marker.openPopup();

      //Dragend marker
      marker.on('dragend', (e) => {
        let latlng = e.target.getLatLng();
        let lat = latlng.lat.toFixed(9);
        let lng = latlng.lng.toFixed(9);

        // push lat lng to coordinates input
        this.coordinates = lat + ',' + lng;
        this.cdr.markForCheck();
      });
    });
  }

  async save() {
    if (this.name && this.coordinates) {
      try {
        await this.dataService.updatePoint(this.key, {
          name: this.name, coordinates: this.coordinates, description: this.description
        });
        this.navCtrl.navigateBack(['/maps']);
      } catch (error: any) {
        const alert = await this.alertCtrl.create({
          header: 'Save Failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
