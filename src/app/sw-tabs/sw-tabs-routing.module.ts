import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tab3PageModule } from '../tab3/tab3.module';
import { SwProfilePageModule } from '../sw-profile/sw-profile.module';
import { SwTabsPage } from '../sw-tabs/sw-tabs.page';

const routes: Routes = [
  {
    path: 'sw-tabs',
    component: SwTabsPage,
    children: [
      {
        path: 'status',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../sw-profile/sw-profile.module').then(
            (m) => m.SwProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/sw-tabs/status',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/sw-tabs/status',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwTabsRoutingModule {}