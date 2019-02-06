import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CurriculumPage } from './curriculum.page';
import { CrearComponent } from './crear/crear.component';
import { CargarComponent } from './cargar/cargar.component';
import { CandidatoComponent } from './candidato/candidato.component';

const routes: Routes = [
  {
    path: '',
    component: CurriculumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurriculumPage, CrearComponent, CargarComponent, CandidatoComponent]
})
export class CurriculumPageModule {}
