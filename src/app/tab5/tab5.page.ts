import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

interface InChargeDocument {
  checkedIn: string;
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  currentUser: any;
  isCheckinYes: boolean = false;
  uid: string;

  inChargeCollection: AngularFirestoreCollection<InChargeDocument>;
  inChargeDocuments: InChargeDocument[] = [];

  constructor(
    private firestore: AngularFirestore,
    private nav: NavController,
    private router: Router
    ) {
    // How to get SW's uid ????
    const SWuserID = sessionStorage.getItem('userID');
    if (SWuserID) {
      this.inChargeCollection = this.firestore.collection('profiles').doc(SWuserID).collection('in-charge');
    }
  }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    this.retrieveInChargeDocuments();
  }

  retrieveInChargeDocuments() {
    this.inChargeCollection.get().subscribe(querySnapshot => {
      querySnapshot.forEach(docSnapshot => {
        const documentData = docSnapshot.data();
        this.inChargeDocuments.push(documentData);
        console.log(this.inChargeDocuments);
      });
    });
  }

  getTextBasedOnCheckinValue(checkedIn: boolean): string {
    if (checkedIn === true) {
      return "The 'checkin' value is Yes.";
    } else {
      return "The 'checkin' value is No.";
    }
  }

  dismissAlert(uid) {
    //const SWuserID = sessionStorage.getItem('swID');
    const currentUserID = sessionStorage.getItem('userID');

    if (currentUserID && uid) {
      const inChargeDocRef = this.firestore
        .collection('profiles')
        .doc(currentUserID)
        .collection('in-charge')
        .doc(uid);

      inChargeDocRef.update({ alerted: false })
        .then(() => {
          inChargeDocRef.update({ 
            fall: false,
            medical: false,
            unwell: false,
            comments: "-"
          })
          window.location.reload();
        })
    }
    this.router.navigate(['sw-tabs', 'alerts']);
    //this.nav.navigateForward(['sw-tabs','alerts']);
    console.log('dismissed');

  }
}

