import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MaterialModule } from '../material/material.module';
import { HorariosEspecialistaComponent } from './horarios-especialista/horarios-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerHistClinicaComponent } from './ver-hist-clinica/ver-hist-clinica.component';
import { PacientesAtendidosComponent } from './pacientes-atendidos/pacientes-atendidos.component';
import { TurnosModule } from '../turnos/turnos.module';
import { PipesModuleModule } from '../pipes-module/pipes-module.module';


@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    MiPerfilComponent,
    HorariosEspecialistaComponent,    
    VerHistClinicaComponent, PacientesAtendidosComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TurnosModule,
    PipesModuleModule
  ],
  exports:[
    VerHistClinicaComponent
  ]
})
export class PerfilUsuarioModule { }
