import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { PlazasPage } from './plazas.page';
import { PopoverComponent } from './popover/popover.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarComponent } from './editar/editar.component';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component';
import { AplicantesComponent } from './aplicantes/aplicantes.component';

const routes: Routes = [
  {
    path: '',
    component: PlazasPage
  },
  {
    path: 'ver/:id',
    component: DetalleComponent
  },
  {
    path: ':idEmpleador/nuevo',
    component: EditarComponent
  },
  {
    path: 'editar/:idEmpleador/:id',
    component: EditarComponent
  },
  {
    path: ':id/aplicantes',
    component: AplicantesComponent
  }
];

@NgModule({
  entryComponents:[PopoverComponent, DetallePopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Nl2BrPipeModule
  ],
  declarations: [PlazasPage, PopoverComponent, DetalleComponent, EditarComponent, DetallePopoverComponent, AplicantesComponent]
})
export class PlazasPageModule {}
