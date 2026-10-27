import { Component, inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private authService = inject(AuthService);
  // register method
  async register() {
    if (this.password === this.confirmPassword && this.email && this.password) {
      try {
        await this.authService.register(this.email, this.password);
        this.navCtrl.navigateBack('/login');
      } catch (error: any) {
        const alert = await this.alertCtrl.create({
          header: 'Registration Failed',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Registration Failed',
        message: 'Passwords do not match.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
