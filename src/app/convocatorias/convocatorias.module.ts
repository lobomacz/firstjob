import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { ConvocatoriasPage } from './convocatorias.page';
import { PopoverComponent } from './popover/popover.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarComponent } from './editar/editar.component';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component';

const routes: Routes = [
  {
    path: '',
    component: ConvocatoriasPage
  },
  {
    path: 'ver/:id',
    component: DetalleComponent
  },
  {
    path: 'nueva',
    component: EditarComponent
  },
  {
    path: 'editar/:id',
    component: EditarComponent
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
  declarations: [ConvocatoriasPage, PopoverComponent, DetalleComponent, EditarComponent, DetallePopoverComponent]
})
export class ConvocatoriasPageModule {}
