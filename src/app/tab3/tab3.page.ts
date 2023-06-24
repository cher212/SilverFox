import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';


interface InChargeDocument {
  checkedIn: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  currentUser: any;
  isCheckinYes: boolean = false;

  inChargeCollection: AngularFirestoreCollection<InChargeDocument>;
  inChargeDocuments: InChargeDocument[] = [];

  constructor(private firestore: AngularFirestore) {
    const parentDocId = 'lHxd5XnwCPTdD2KwEXCvRZuXlxq1';
    this.inChargeCollection = this.firestore.collection('profiles').doc(parentDocId).collection<InChargeDocument>('in-charge');
  }

  ngOnInit() {
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

  getTextBasedOnCheckinValue(checkedIn: boolean): string{
    if (checkedIn === true) {
      return "The 'checkin' value is Yes.";
    } else {
      return "The 'checkin' value is No.";
    }
  }
}


  /*constructor(
    private firestore: AngularFirestore,
    //private checkedin: boolean
  ) { }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }

    this.isCheckedin()
    .then((result) => {
      this.isCheckinYes = result;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  isCheckedin(): Promise<boolean> {
    const profilesCollection = this.firestore.collection('profiles');
    const parentDocId = 'lHxd5XnwCPTdD2KwEXCvRZuXlxq1';
    const inChargeCollection = profilesCollection.doc(parentDocId).collection('in-charge');
    const documentId = 'L1TVL6AygVoEtKnOg66w';
  
    return new Promise<boolean>((resolve, reject) => {
      from(inChargeCollection.doc(documentId).get().pipe(first()))
        .toPromise()
        .then((docSnapshot) => {
          if (docSnapshot && docSnapshot.exists) {
            const checkinValue = docSnapshot.data()?.['checked in'];
            resolve(checkinValue === 'Yes');
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }*/

  

