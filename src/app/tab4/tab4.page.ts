import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  fall:boolean = false;
  unwell:boolean= false;
  medical:boolean= false;

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

  async updateAlerts(fall:boolean, medical: boolean, unwell:boolean) {
    const SWuserID = sessionStorage.getItem('swID');
    const currentUserID = sessionStorage.getItem('userID');

    if (currentUserID && SWuserID) {
      const inChargeDocRef = this.firestore
        .collection('profiles')
        .doc(SWuserID)
        .collection('in-charge')
        .doc(currentUserID);

      inChargeDocRef.update({ alerted: true })
        .then(() => {
          this.firestore
        .collection('profiles')
        .doc(SWuserID)
        .collection('in-charge')
        .doc(currentUserID).update({ 
            fall: fall,
            medical: medical,
            unwell: unwell,
          })
        })
    }

    this.nav.navigateForward(['tabs', 'tab1']);

  }

}
