import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registrar', loadChildren: './registrar/registrar.module#RegistrarPageModule' },
  { path: 'userProfile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'plazas', loadChildren: './plazas/plazas.module#PlazasPageModule' },
  { path: 'oferta', loadChildren: './oferta/oferta.module#OfertaPageModule' },
  { path: 'curriculum', loadChildren: './curriculum/curriculum.module#CurriculumPageModule' },
  { path: 'error', loadChildren: './error/error.module#ErrorPageModule' },
  { path: '**', loadChildren: './error/error.module#ErrorPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
