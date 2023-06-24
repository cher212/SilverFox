import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwProfilePageRoutingModule } from './sw-profile-routing.module';

import { SwProfilePage } from './sw-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwProfilePageRoutingModule
  ],
  declarations: [SwProfilePage]
})
export class SwProfilePageModule {}
