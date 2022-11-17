import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosMedicoComponent } from './turnos-medico/turnos-medico.component';
import { TurnosTodosComponent } from './turnos-todos/turnos-todos.component';
import { ModalComentariosComponent } from './modal-comentarios/modal-comentarios.component';
import { ModalVerComentarioComponent } from './modal-ver-comentario/modal-ver-comentario.component';
import { ModalEncuestaComponent } from './modal-encuesta/modal-encuesta.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { PipesModuleModule } from '../pipes-module/pipes-module.module';
import { DirectivesModule } from '../directives/directives.module';
import { ModalhistclinComponent } from './modalhistclin/modalhistclin.component';


@NgModule({
  declarations: [
    TurnosComponent,
    SolicitarTurnoComponent,
    TurnosPacienteComponent,
    TurnosMedicoComponent,
    TurnosTodosComponent,
    ModalComentariosComponent,
    ModalVerComentarioComponent,
    ModalEncuestaComponent,
    HistoriaClinicaComponent,
    ModalhistclinComponent,
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModuleModule,
    DirectivesModule
  ],
  exports:[
    ModalVerComentarioComponent
  ]
})
export class TurnosModule { }
