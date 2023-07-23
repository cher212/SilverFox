import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  formData: FormGroup;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    const email = this.formData.value.email;
  
    this.toastCtrl
      .create({
        message: 'A reset email link has been sent to your registered email',
        duration: 3000,
        position: 'bottom',
      })
      .then((alert) => alert.present());
  
    this.navCtrl.navigateRoot('login-page');
  
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  goBack() {
    this.navCtrl.back(); // Use NavController to navigate back
  }
}