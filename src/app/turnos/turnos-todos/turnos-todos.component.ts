import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-turnos-todos',
  templateUrl: './turnos-todos.component.html',
  styleUrls: ['./turnos-todos.component.css']
})
export class TurnosTodosComponent implements OnInit {

  displayedColumns: string[] = ['paciente', 'medico', 'especialidad', 'fecha','hora','estado','acciones'];

  todosLosTurnos : Turnos[] = [];  
  
  dataSource !: any;

  turnosAux : Turnos[] = [];
  turnoParaCancelar : any;

  constructor(private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.traerLosTurnos();
    //console.log(this.dataSource.filteredData);    
  }

  traerLosTurnos(){
    this.turnServ.traerTurnos().subscribe(
      turnos=>{
        this.todosLosTurnos = turnos;
        this.dataSource = new MatTableDataSource(turnos);
      }
    )
  }

  filtrarTabla(event: Event | any) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    let filtrar = true;
    
    if(filterValue.length == 1 && event.key != 'Backspace'){
      this.turnosAux = this.todosLosTurnos;      
      
      //console.log('entro');      
    }else if(filterValue.length == 0 && event.key == 'Backspace'){
      this.todosLosTurnos = this.turnosAux;
      filtrar=false;
    }
    //console.log(this.turnosAux);
    
    if(filtrar){
      //console.log(this.todosLosTurnos);
      let turnosFiltrados : Turnos[] = [];
      
      this.turnosAux.forEach(
        t=>{
          if(t.especialidad.toLowerCase().includes(filterValue)){
            //console.log('entro');            
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.medico.nombre.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.medico.apellido.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
        }
      )
      this.todosLosTurnos = turnosFiltrados;
    }
    
  }

  cargarComentarios(turno:Turnos,estado:string){
    this.turnoParaCancelar = {turno: turno,estado:estado}
  }

}
