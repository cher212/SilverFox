import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPagePageRoutingModule } from './login-page-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginPagePage } from './login-page.page';
import { AuthService } from '../services/auth.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPagePageRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
  declarations: [LoginPagePage],
  providers: [AuthService],
})
export class LoginPagePageModule {}
