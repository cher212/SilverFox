import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, updateProfile } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


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
    private toastr: ToastController,
    private nav: NavController,
    private firestore: AngularFirestore
   ){}

   // Easy access for form fields
   
   get fullName(){
    return this.credentials.get('fullName')
   }
   
   public get nric() {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      nric: ['', [Validators.required]],
      socialWorkerID: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, );
  }
  

  async register() {

    const confirmPassword = this.credentials.value.confirmPassword;

  
    var nric_str = (<HTMLInputElement>document.getElementById("nric_html")).value; 
    var socialWorkerID = (<HTMLInputElement>document.getElementById("socialWorkerID_html")).value;


    this.authService.register(this.credentials.value)

    .then(resp => {
      console.log(resp);

      for (const controlName in this.credentials.controls) {
        const control = this.credentials.get(controlName);
        if (control?.value === '') {
          const fieldName = controlName.charAt(0).toUpperCase() + controlName.slice(1);
          this.showToast(`${fieldName} is required`);
          return;
        }
      }

      if (!this.email?.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        this.showToast('Invalid email address');
        return;
      }
      if (this.password?.value.length < 6) {
        this.showToast('Password should be at least 6 characters long');
        return;
      }

      if (this.password?.value !== confirmPassword) {
        this.showToast('Password and confirm password fields do not match');
        return;
      }
      if (resp) {
        updateProfile(resp.user, {
          displayName: this.credentials.value.fullName,
        });
        this.authService.setUser({
        username: resp.user.displayName,
        uid: resp.user.uid,
        nric: nric_str,
        socialWorkerID: socialWorkerID,
        
      })

        const userProfile = this.firestore.collection('profiles').doc(resp.user.uid);
        userProfile.get().subscribe( result => {
            this.firestore.doc(`profiles/${this.authService.getUserUid()}`).set({
              name: resp.user.displayName,
              email: resp.user.email,
              nric: nric_str,
              socialWorkerID : socialWorkerID,
              role: "elderly",
              checkedIn: "false"
            })
            .then(() => {
              return this.firestore.doc(`profiles/${socialWorkerID}/in-charge/${this.authService.getUserUid()}`).set({
                name: resp.user.displayName,
                email: resp.user.email,
                nric: nric_str,
                role: "elderly",
                checkedIn: "false"
              });
          })
            
            
            ;
            sessionStorage.clear();
            this.nav.navigateForward(['login-page']);
          //}

        });

      }
    }).catch(error => {
      let message = '';
      
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Weak password. Please choose a stronger password.';
      } else {
        message = 'An error occurred. Please try again later.';
      }
      
      this.showToast(message);
    });
  }

  async showToast(message: string) {
    const toast = await this.toastr.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }



        /*this.router.navigate(['login-page']);
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
    });

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
