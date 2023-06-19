import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, updateProfile } from "firebase/auth";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastController
   ){}

   // Easy access for form fields
   
   get fullName(){
    return this.credentials.get('fullName')
   }
   
   get nric() {
    return this.credentials.get('nric');
   }
   get email() {
    return this.credentials.get('email');
   }

   get password() {
    return this.credentials.get('password');
   }


  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      nric: ['', [Validators.required]],
    });
  }

  async register() {
    this.authService.register(this.credentials.value)
    .then( response => {
      console.log(response);
      if (response.user) {
        updateProfile(response.user, {
        displayName: this.credentials.value.fullName,
        //email: this.credentials.value.email,
        //nric: this.credentials.value.nric
      });
      this.router.navigate(['login-page']);
      

    }
  })
      
      /*user => {
      if (user) {
        this.router.navigate(['tabs', 'tab1']);
      } else {
        console.log('Signup unsuccessful.');
      }
    })
    .catch(async error => {
      console.log('Signup error:', error);
      const toast = await this.toastr.create({
        message: 'Email and/or Password is incorrect',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }*/
    

    //await loading.dismiss();


    /*if (user) {
      this.router.navigateByUrl('/tabs/tab1', {replaceUrl: true});
    } else {
      this.showAlert('Registration failed','Please try again');
    }
    
    
  }    

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      //buttons: ['0K'],
    });*/
  }

}
