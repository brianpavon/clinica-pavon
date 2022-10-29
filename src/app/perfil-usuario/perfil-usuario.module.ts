import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule
  ]
})
export class PerfilUsuarioModule { }
