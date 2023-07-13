import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private nav: NavController,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  async submit() {
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
          this.firestore.doc(`profiles/${currentUserID}`).update({ alerted: true })
        })
    }

    this.nav.navigateForward(['tabs', 'tab1']);

  }

}
