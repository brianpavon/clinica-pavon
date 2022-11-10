import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MaterialModule } from '../material/material.module';
import { HorariosEspecialistaComponent } from './horarios-especialista/horarios-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerHistClinicaComponent } from './ver-hist-clinica/ver-hist-clinica.component';


@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    MiPerfilComponent,
    HorariosEspecialistaComponent,    
    VerHistClinicaComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    VerHistClinicaComponent
  ]
})
export class PerfilUsuarioModule { }
