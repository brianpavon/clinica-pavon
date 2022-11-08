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


@NgModule({
  declarations: [
    TurnosComponent,
    SolicitarTurnoComponent,
    TurnosPacienteComponent,
    TurnosMedicoComponent,
    TurnosTodosComponent,
    ModalComentariosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TurnosModule { }
