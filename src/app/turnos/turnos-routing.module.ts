import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnosMedicoComponent } from './turnos-medico/turnos-medico.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosTodosComponent } from './turnos-todos/turnos-todos.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
  { path: '', component: TurnosComponent,
    children:[
      {path:'pedir-turno',component:SolicitarTurnoComponent},
      {path:'turnos-paciente',component:TurnosPacienteComponent},
      {path:'turnos-especialista',component:TurnosMedicoComponent},
      {path:'todos-los-turnos',component:TurnosTodosComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
