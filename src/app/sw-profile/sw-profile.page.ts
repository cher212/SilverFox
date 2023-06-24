import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-sw-profile',
  templateUrl: './sw-profile.page.html',
  styleUrls: ['./sw-profile.page.scss'],
})
export class SwProfilePage implements OnInit {

  constructor(public navCntrl: NavController,) { }
  currentUser: any;

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  logout() {
    sessionStorage.clear();
    this.navCntrl.navigateForward('login-page');
  }
}


