import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  currentUser: any;
  isCheckinYes: boolean = false;

  constructor(
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
  }

  


  /*isCheckedin() {
    const profilesCollection = this.firestore.collection('profiles');
    const parentDocId = 'lHxd5XnwCPTdD2KwEXCvRZuXlxq1';
    const inChargeCollection = profilesCollection.doc(parentDocId).collection('in-charge');
    const documentId = 'L1TVL6AygVoEtKnOg66w';
    //var checkedin = this.checkedin;

    from(inChargeCollection.doc(documentId).get().pipe(first()))
      .toPromise()
      .then(docSnapshot => {
        if (docSnapshot && docSnapshot.exists) {
          const checkinValue = docSnapshot.data()?.['checkin'];
          if (checkinValue === 'Yes') {
            console.log("The 'checkin' field value is 'Yes'.");
            //return true;
          } else {
            console.log("The 'checkin' field value is not 'Yes'.");
            //return false;
          }
        } else {
          console.log('Document does not exist.');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });


    /*
        if (incharge.doc('L1TVL6AygVoEtKnOg66w').)
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
        }
    
        async function getGearData() {
          const myArray = [];
          const querySnapshot = await firebase.firestore().collection('gear').get();
          querySnapshot.forEach(doc => {
              const check = doc.data().Name;
              console.log(check);
              myArray.push(check);
          });
          return myArray;
      }
    
    }
    }*/
  }

