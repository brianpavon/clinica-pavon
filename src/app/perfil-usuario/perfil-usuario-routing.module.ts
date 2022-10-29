import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PerfilUsuarioComponent } from './perfil-usuario.component';

const routes: Routes = [
  { path: '', component: PerfilUsuarioComponent,
    children:[
      {path:'',component:MiPerfilComponent},
      {path:'mi-perfil',component:MiPerfilComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUsuarioRoutingModule { }
