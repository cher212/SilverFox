import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { interval } from 'rxjs';
import { NavController, AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page implements OnInit {

  currentUser: any;
  isCheckIn : boolean | null = null;
  isClicked = false;
  
  
  constructor(
    private firestore: AngularFirestore,
    private nav: NavController,
  ) {
  }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    const swID = sessionStorage.getItem('swID');
    const userID = sessionStorage.getItem('userID');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }


    // Calculate the time until the next midnight
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    // Schedule the resetButtonValue function to be called every day at midnight
    interval(timeUntilMidnight).subscribe(() => {
      this.resetButtonValue();
    });

    
    if (userID) {
      this.firestore.collection('profiles').doc(userID).get()
        .subscribe((snapshot) => {
          const data = snapshot.data();
          if (data && data['checkedIn'] !== undefined) {
            this.isCheckIn = data['checkedIn'];
          }
        });
    }

  }

  handleRefresh(event) { 
    setTimeout(() => { 
      window.location.reload(); 
      event.target.complete(); 
    }, 2000); 
  }

  handlerMessage = '';
  roleMessage = '';
  buttonValue = 0;


  public alertButtons = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'YES',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
        console.log('alert confirmed');
        this.nav.navigateForward(['tab4']);

      },
    },
  ];


  resetButtonValue() {
    const userID = sessionStorage.getItem('userID');
    const SWuserID = sessionStorage.getItem('swID');

    if (userID && SWuserID) {
      const elderRef = this.firestore.collection('profiles').doc(userID);
      const inChargeDocRef = this.firestore
      .collection('profiles')
      .doc(SWuserID)
      .collection('in-charge')
      .doc(userID);

      // Update the 'checkedIn' field to false
      elderRef.update({ checkedIn: false })
        .then(() => {
          console.log('Button value reset to false');
        })
        .catch((error) => {
          console.error('Error updating checkedIn field:', error);
        });
        inChargeDocRef.update({ checkedIn: false })
        .then(() => {
          console.log('Button value reset to false');
        })
        .catch((error) => {
          console.error('Error updating checkedIn field:', error);
        });
    } else {
      console.error('User ID is not available in sessionStorage');
    }
  }



  updateCheckInStatus() {
    this.isClicked = true;

    const SWuserID = sessionStorage.getItem('swID');
    const currentUserID = sessionStorage.getItem('userID');

    if (currentUserID && SWuserID) {
      const inChargeDocRef = this.firestore
        .collection('profiles')
        .doc(SWuserID)
        .collection('in-charge')
        .doc(currentUserID);

      inChargeDocRef.update({ checkedIn: true })
        .then(() => {
           this.firestore.doc(`profiles/${currentUserID}`).update({ checkedIn: true })
        })
        .then(() => {
          console.log('Check-in status updated successfully');
        })
        .catch((error) => {
          console.error('Error updating check-in status:', error);
        });
    } else {
      console.error('Current user ID is not available in sessionStorage');
    }
  }

}











