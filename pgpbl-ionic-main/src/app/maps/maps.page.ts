import { Component, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../data.service';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/images/marker-icon-2x.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {
  map!: L.Map;
  markers = L.layerGroup();

  private dataService = inject(DataService);
  private navCtrl = inject(NavController);
  constructor() { }

  ngOnInit() {
    if (!this.map) {
      setTimeout(() => {
        this.map = L.map('map').setView([-7.7956, 110.3695], 13);
        var osm =
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        });
        osm.addTo(this.map);
        this.markers.addTo(this.map);

        // Delete link inside the marker popup
        this.map.on('popupopen', (e) => {
          const popup = e.popup;
          // Open editpoint through the Ionic router instead of a full page reload
          const editLink = popup.getElement()?.querySelector('.edit-link');
          if (editLink) {
            editLink.addEventListener('click', (event) => {
              event.preventDefault();
              const key = (event.target as HTMLElement).dataset['key'];
              if (key) {
                this.navCtrl.navigateForward(['/editpoint', key]);
              }
            });
          }
          const deleteLink = popup.getElement()?.querySelector('.delete-link');
          if (deleteLink) {
            deleteLink.addEventListener('click', (event) => {
              event.preventDefault();
              const key = (event.target as HTMLElement).dataset['key'];
              if (key) {
                this.deletePoint(key, popup.getLatLng());
              }
            });
          }
        });

        this.loadPoints();
      });
    }
  }

  // Reload points when coming back from createpoint / editpoint
  ionViewWillEnter() {
    if (this.map) {
      this.loadPoints();
    }
  }

  async loadPoints() {
    const points: any = await this.dataService.getPoints();
    this.markers.clearLayers();
    for (const key in points) {
      if (points.hasOwnProperty(key)) {
        const point = points[key];
        const coordinates = point.coordinates.split(',').map((c: string) => parseFloat(c));
        const marker = L.marker(coordinates as L.LatLngExpression).addTo(this.markers);
        marker.bindPopup(`${point.name}<br>` +
          `<a href="/editpoint/${key}" class="edit-link" data-key="${key}">Edit</a> | ` +
          `<a href="#" class="delete-link" data-key="${key}">Delete</a>`);
      }
    }
  }

  async deletePoint(key: string, latLng: L.LatLng | undefined) {
    await this.dataService.deletePoint(key);
    if (latLng) {
      this.markers.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          if (layer.getLatLng().equals(latLng)) {
            this.markers.removeLayer(layer);
          }
        }
      });
    }
  }
}
