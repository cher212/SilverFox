import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';

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
  todayDate: string;
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

    this.getTodayDate();
  }
  
  handleRefresh(event) { 
    setTimeout(() => { 
      window.location.reload(); 
      event.target.complete(); 
    }, 2000); 
  }
  
  getTodayDate() {
    const today = new Date();
    this.todayDate = formatDate(today, 'dd MMM yyyy', 'en');
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



