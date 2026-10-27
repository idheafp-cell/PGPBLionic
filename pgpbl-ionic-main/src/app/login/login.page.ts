import { Component, inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private authService = inject(AuthService);
  // login method
  async login() {
    if (this.email && this.password) {
      try {
        await this.authService.login(this.email, this.password);
        this.navCtrl.navigateRoot('/tabs');
      } catch (error: any) {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
