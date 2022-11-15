import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-graficos-estadisticas',
  templateUrl: './graficos-estadisticas.component.html',
  styleUrls: ['./graficos-estadisticas.component.css']
})
export class GraficosEstadisticasComponent implements OnInit {
  todosLosTurnos : Turnos[] = [];
  //por especialidad
  turnosPorEspecialidad : any[] = [];
  especialidades : string[] =[];
  //por fechas
  fechas : string[] =[];
  turnosPorFechas : any[] = [];
  //por medico
  idsMedico : string[] =[];
  turnosPorMedico : any[] = [];


  constructor(private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.traerTurnos();
  }

  traerTurnos(){
    this.turnServ.traerTurnos().subscribe(
      t=>{
        this.todosLosTurnos = t;
        //console.log(this.todosLosTurnos);
        
        this.todosLosTurnos.forEach(turno=>{
          console.log(turno.medico.apellido);
          
          //guardo especialidades
          if(!this.especialidades.includes(turno.especialidad)){
            this.especialidades.push(turno.especialidad);
          }
          //guardo fechas
          if(!this.fechas.includes(turno.fecha)){
            this.fechas.push(turno.fecha)
          }
          //guardo id medico
          if(!this.idsMedico.includes(turno.medico.id)){
            this.idsMedico.push(turno.medico.id)
          }
        })

        this.totalTurnosPorEspecialidad()
        this.totalTurnosPorFecha();
        this.totalTurnosPorMedico()
        
        
      }
    )
  }

  totalTurnosPorEspecialidad(){
    for (let i = 0; i < this.especialidades.length; i++) {
      let contador = 0;
      let especialidad = {
        "especialidad" : this.especialidades[i],
        "cantidad":contador
      }
      for (let j = 0; j < this.todosLosTurnos.length; j++) {
        if(this.todosLosTurnos[j].especialidad == this.especialidades[i]){
          contador++
        }
      }
      especialidad.cantidad = contador;
      this.turnosPorEspecialidad.push(especialidad);
      
    }
    //console.log(this.turnosPorEspecialidad);
  }

  totalTurnosPorFecha(){
    for (let i = 0; i < this.fechas.length; i++) {
      let contador = 0;
      let fecha = {
        "fecha" : this.fechas[i],
        "cantidad":contador
      }
      for (let j = 0; j < this.todosLosTurnos.length; j++) {
        if(this.todosLosTurnos[j].fecha == this.fechas[i]){
          contador++
        }
      }
      fecha.cantidad = contador;
      this.turnosPorFechas.push(fecha);
      
    }
    //console.log(this.turnosPorFechas);
  }

  totalTurnosPorMedico(){
    // let hoy = new Date();

    // let fechaFutura = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate() + 14);
    
    // //let turnosFecha = this.todosLosTurnos.filter(t=> Date.parse(t.fecha) > hoy && Date.parse(t.fecha) < fechaFutura )
    // this.todosLosTurnos.forEach(
    //   t=>{
    //     console.log(Date.parse(t.fecha));
        
    //   }
    // )
    //console.log(turnosFecha);
    
    for (let i = 0; i < this.idsMedico.length; i++) {
      let contador = 0;
      let medico = {
        "nombre" : this.idsMedico[i],
        "cantidad":contador
      }
      for (let j = 0; j < this.todosLosTurnos.length; j++) {
        if(this.todosLosTurnos[j].medico.id == this.idsMedico[i]){
          if(contador == 0){
            medico.nombre = `${this.todosLosTurnos[j].medico.nombre} ${this.todosLosTurnos[j].medico.apellido}`
          }
          contador++
        }
      }
      medico.cantidad = contador;
      this.turnosPorMedico.push(medico);
      
    }
    console.log(this.turnosPorMedico);
  }

}
