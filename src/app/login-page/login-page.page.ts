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

  // onLogin() {
  //   const email = this.formData.value.email;
  //   const password = this.formData.value.password;
  
  //   this.authService.login(email, password)

  //     .then(user => {
  //       if (user) {
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         console.log(user);
  //         this.router.navigate(['tabs', 'tab1']);
  //       } else {
  //         console.log('Login unsuccessful.');
  //       }
  //     })
  //     .catch(async error => {
  //       console.log('Login error:', error);
  //       const toast = await this.toastr.create({
  //         message: 'Email and/or Password is incorrect',
  //         duration: 2000,
  //         color: 'danger'
  //       });
  //       toast.present();
  //     });
  // }

  onLogin() {
    const email = this.formData.value.email;
    const password = this.formData.value.password;
  
    this.authService.login(email, password)
      .then(user => {
        if (user) {
          this.firestore.collection('profiles').doc(user.uid).get()
            .toPromise()
            .then(snapshot => {
              if (snapshot && snapshot.exists) {
                const userDetails = snapshot.data();

                sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
                console.log(userDetails);
                this.router.navigate(['tabs', 'tab1']);
              } else {
                console.log('User details not found.');
              }
            })
            .catch(error => {
              console.log('Firestore error:', error);
            });
        } else {
          console.log('Login unsuccessful.');
        }
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
