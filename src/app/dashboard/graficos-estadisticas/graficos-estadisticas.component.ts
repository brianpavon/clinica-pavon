import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-graficos-estadisticas',
  templateUrl: './graficos-estadisticas.component.html',
  styleUrls: ['./graficos-estadisticas.component.css']
})
export class GraficosEstadisticasComponent implements OnInit {
  turnosPorEspecialidad : any[] = [];
  todosLosTurnos : Turnos[] = [];
  especialidades : string[] =[];

  constructor(private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.traerTurnos();
  }

  traerTurnos(){
    this.turnServ.traerTurnos().subscribe(
      t=>{
        this.todosLosTurnos = t;
        this.todosLosTurnos.forEach(turno=>{
          console.log(turno.especialidad);
          
          if(!this.especialidades.includes(turno.especialidad)){
            this.especialidades.push(turno.especialidad);
          }
        })
        
        this.totalTurnosPorEspecialidad()
        
        
        
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
    console.log(this.turnosPorEspecialidad);
  }

}
