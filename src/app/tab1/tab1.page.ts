import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

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
      },
    },
  ];

  
}



