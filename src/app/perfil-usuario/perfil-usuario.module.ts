import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MaterialModule } from '../material/material.module';
import { HorariosEspecialistaComponent } from './horarios-especialista/horarios-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    MiPerfilComponent,
    HorariosEspecialistaComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PerfilUsuarioModule { }
