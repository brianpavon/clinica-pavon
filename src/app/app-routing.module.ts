import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent, data: {animation: 'Home'}},
  {path:'login',component:LoginComponent, data: {animation: 'Login'}},
  {path:'registro',component:RegistroComponent,data: {animation: 'Registro'}},
  {path: 'panel-control', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) ,data:{animation:'PanelControl'}},
  { path: 'mi-perfil', loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioModule),data:{animation:'Perfil'}},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'turnos', loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule),data:{animation:'Turnos'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
