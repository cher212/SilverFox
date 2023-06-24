import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwProfilePage } from './sw-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SwProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwProfilePageRoutingModule {}
