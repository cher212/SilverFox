import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-profile-password-edit',
  templateUrl: './profile-password-edit.page.html',
  styleUrls: ['./profile-password-edit.page.scss'],
})
export class ProfilePasswordEditPage implements OnInit {
  newPassword: string;
  confirmPassword: string;

  constructor(private authService: AuthService, private toastController: ToastController, public nav: NavController) { }

  ngOnInit() {
  }

  async onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Passwords do not match.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }
  
    try {
      await this.authService.changePassword(this.newPassword, this.confirmPassword);
      const toast = await this.toastController.create({
        message: 'Password changed successfully.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      sessionStorage.clear()
      this.nav.navigateForward('login-page')
      
    } catch (error) {
      const toast = await this.toastController.create({
        message: error as string,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  
  }

  goBack() {
    this.nav.back(); // Use NavController to navigate back
  }
}