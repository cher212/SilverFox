import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

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

  inChargeCollection: AngularFirestoreCollection<InChargeDocument>;
  inChargeDocuments: InChargeDocument[] = [];

  constructor(private firestore: AngularFirestore) {
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
}

