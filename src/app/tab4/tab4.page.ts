import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  fall:boolean = false;
  unwell:boolean= false;
  medical:boolean= false;
  comments: string;

  constructor(
    private nav: NavController,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  /*public form = [
    { val: 'Experienced a fall' },
    { val: 'Urgent Medical Attention'},
    { val: 'Feeling unwell' }
  ];
  
  triggerEvent(event, value) {
    this.firestore.collection('profiles').doc('abc').set({
      value: event.detail.checked
    })
  }*/
    formatDate(timestamp: firebase.firestore.Timestamp): string {
      const date = timestamp.toDate();
      return date.toLocaleString(); // Adjust the format as per your requirements
    }
  

  async updateAlerts(fall: boolean, medical: boolean, unwell: boolean, comments: string) {
    const SWuserID = sessionStorage.getItem('swID');
    const currentUserID = sessionStorage.getItem('userID');
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const time = this.formatDate(timestamp);


  
    if (currentUserID && SWuserID) {
      const inChargeDocRef = this.firestore
        .collection('profiles')
        .doc(SWuserID)
        .collection('in-charge')
        .doc(currentUserID);
  
      inChargeDocRef.update({ alerted: true })
        .then(() => {
          inChargeDocRef.update({
              fall: fall,
              medical: medical,
              unwell: unwell,
              time: time
            });
  
          if (comments && comments != "-") {
            inChargeDocRef.update({
              comments: comments
            });
          } else {
            inChargeDocRef.update({
              comments: "-"
            });
          }
        })
        .then(() => {
          this.nav.navigateForward(['tabs', 'tab1']);
          // Navigate forward after a slight delay (e.g., 2 seconds)
          setTimeout(() => {
            
            // Reload the current page
            window.location.reload();
          }, 4000); // Change the delay time as needed
        });
    }
  }

  goBack() {
    this.nav.back(); // Use NavController to navigate back
  }  

}
