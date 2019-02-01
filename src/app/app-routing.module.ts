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
  { path: 'convocatorias', loadChildren: './convocatorias/convocatorias.module#ConvocatoriasPageModule' },
  { path: 'curriculum', loadChildren: './curriculum/curriculum.module#CurriculumPageModule' },
  { path: 'credenciales', loadChildren: './credenciales/credenciales.module#CredencialesPageModule' },
  { path: 'administrar', loadChildren: './administrar/administrar.module#AdministrarPageModule' },
  { path: 'error', loadChildren: './error/error.module#ErrorPageModule' },
  { path: '**', loadChildren: './error/error.module#ErrorPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
