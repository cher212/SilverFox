import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwTabsRoutingModule } from './sw-tabs-routing.module';

import { SwTabsPage } from './sw-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwTabsRoutingModule
  ],
  declarations: [SwTabsPage]
})
export class SwTabsPageModule {}
