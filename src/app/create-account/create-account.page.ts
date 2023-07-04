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
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      nric: ['', [Validators.required]],
    });
  }

  async register() {
    //const loading = await this.loadingController.create();
    //await loading.present();

    //const user = await 
    var nric_str = (<HTMLInputElement>document.getElementById("nric_html")).value; 
    var socialWorkerID = (<HTMLInputElement>document.getElementById("socialWorkerID_html")).value;


    this.authService.register(this.credentials.value)

    .then(resp => {
      console.log(resp);
      
      if (resp) {
        updateProfile(resp.user, {
          displayName: this.credentials.value.fullName,
        });
        this.authService.setUser({
        username: resp.user.displayName,
        uid: resp.user.uid,
        nric: nric_str
        
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

        })

      }
    })
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
