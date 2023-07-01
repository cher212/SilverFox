import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
      },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'profile-password-edit',
    loadChildren: () => import('./profile-password-edit/profile-password-edit.module').then( m => m.ProfilePasswordEditPageModule)
  },
  {
    path: 'sw-tabs',
    loadChildren: () => import('./sw-tabs/sw-tabs.module').then(m => m.SwTabsPageModule)
  },
  {
    path: 'sw-profile',
    loadChildren: () => import('./sw-profile/sw-profile.module').then( m => m.SwProfilePageModule)
  },
  {
    path: 'sw-tabs',
    loadChildren: () => import('./sw-tabs/sw-tabs.module').then( m => m.SwTabsPageModule)
  },  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
