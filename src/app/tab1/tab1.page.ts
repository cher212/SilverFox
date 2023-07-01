import { Component , OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { interval } from 'rxjs';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

interface InChargeDocument {
  checkedIn: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page implements OnInit {

  currentUser: any;
  inChargeCollection: AngularFirestoreCollection<InChargeDocument>;
  inChargeDocuments: InChargeDocument[] = [];

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
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
  }

  constructor(
    private firestore: AngularFirestore,
    private nav: NavController,
    ) {
    const parentDocId = 'lHxd5XnwCPTdD2KwEXCvRZuXlxq1';
    this.inChargeCollection = this.firestore.collection('profiles').doc(parentDocId).collection<InChargeDocument>('in-charge');
  }

  handlerMessage = '';
  roleMessage = '';

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
  
  checkIn() {
    const userID = sessionStorage.getItem('userID');
  
    if (userID) {
      const elderRef = this.firestore.collection('profiles').doc(userID);
  
      // Update the 'checkedIn' field to true
      elderRef.update({ checkedIn: true })
        .then(() => {
          console.log('Check-in successful');
        })
        .catch((error) => {
          console.error('Error updating checkedIn field:', error);
        });
    } else {
      console.error('User ID is not available in sessionStorage');
    }
  }

  resetButtonValue() {
    const userID = sessionStorage.getItem('userID');

    if (userID) {
      const elderRef = this.firestore.collection('profiles').doc(userID);

      // Update the 'checkedIn' field to false
      elderRef.update({ checkedIn: false })
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
    const SWuserID = 'lHxd5XnwCPTdD2KwEXCvRZuXlxq1';
    const currentUserID = sessionStorage.getItem('userID');
  
    if (currentUserID) {
      const inChargeDocRef = this.firestore
        .collection('profiles')
        .doc(SWuserID)
        .collection('in-charge')
        .doc(currentUserID);
  
      inChargeDocRef.update({ checkedIn: true })
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
  
  
  
  
  
  





