import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    TurnosComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MaterialModule
  ]
})
export class TurnosModule { }
