import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { UserProfilePage } from './user-profile.page';
import { PopoverComponent } from './popover/popover.component';
import { ActualizarComponent } from './actualizar/actualizar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ver',
    pathMatch: 'full'
  },
  {
    path: 'nuevo/:tipo/:id',
    redirectTo: 'actualizar/:tipo/:id',
    pathMatch: 'full'
  },
  {
    path: 'actualizar/:tipo/:id',
    component: ActualizarComponent
  },
  {
    path: 'ver',
    component: UserProfilePage
  },
  {
    path: 'ver/:id',
    component: UserProfilePage
  }
];

@NgModule({
  entryComponents:[PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Nl2BrPipeModule
  ],
  declarations: [UserProfilePage, PopoverComponent, ActualizarComponent]
})
export class UserProfilePageModule {}
