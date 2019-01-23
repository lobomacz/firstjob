import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlazasPage } from './plazas.page';
import { AplicarComponent } from './aplicar/aplicar.component';
import { PopoverComponent } from './popover/popover.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarComponent } from './editar/editar.component';

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
    path: 'nuevo',
    component: EditarComponent
  },
  {
    path: 'editar/:id',
    component: EditarComponent
  }
];

@NgModule({
  entryComponents:[PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlazasPage, AplicarComponent, PopoverComponent, DetalleComponent, EditarComponent]
})
export class PlazasPageModule {}
