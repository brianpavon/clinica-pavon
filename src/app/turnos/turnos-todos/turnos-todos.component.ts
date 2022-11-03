import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-todos',
  templateUrl: './turnos-todos.component.html',
  styleUrls: ['./turnos-todos.component.css']
})
export class TurnosTodosComponent implements OnInit {

  displayedColumns: string[] = ['paciente', 'medico', 'especialidad', 'fecha','hora','estado','acciones'];

  todosLosTurnos : Turnos[] = [];

  constructor(private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.traerLosTurnos();
  }

  traerLosTurnos(){
    this.turnServ.traerTurnos().subscribe(
      turnos=>{
        this.todosLosTurnos = turnos;
      }
    )
  }

}
