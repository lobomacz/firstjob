import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'reset',
    component: ResetComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage, ResetComponent]
})
export class LoginPageModule {}
