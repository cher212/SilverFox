import { Component, OnInit } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {  getFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CreateAccountPage } from '../create-account/create-account.page';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  db = getFirestore();
  formData: FormGroup;

  constructor(public navCntrl: NavController, 
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastController,
    private firestore: AngularFirestore,
    private nav: NavController
    ) { }


  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onLogin() {
    const email = this.formData.value.email;
    const password = this.formData.value.password;
    var nric_str = (<HTMLInputElement>document.getElementById("nric_html")).value; 
  
    this.authService.login(email, password)
    .then(resp => {
      console.log(resp);
      this.authService.setUser({
        username: resp.displayName,
        uid: resp.uid,
        nric: nric_str
        
      })

      if (resp.auth ) {
        const userProfile = this.firestore.collection('profiles').doc(resp.uid);
        userProfile.get().subscribe( result => {
          if(result.exists){
            this.nav.navigateForward(['tabs', 'tab1']);
          } else {
            this.firestore.doc(`profiles/${this.authService.getUserUid()}`).set({
              name: resp.displayName,
              email: resp.email,
              nric: nric_str,
              role: "elderly"
            });
            this.nav.navigateForward(['tabs', 'tab1']);
          }

        })

      }

      /*.then(user => {
        if (user) {
          this.router.navigate(['tabs', 'tab1']);
        } else {
          console.log('Login unsuccessful.');
        }*/
      })
      .catch(async error => {
        console.log('Login error:', error);
        const toast = await this.toastr.create({
          message: 'Email and/or Password is incorrect',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      });
  }


  gotoSignup() {
    this.navCntrl.navigateForward('create-account');
  }

  

}
