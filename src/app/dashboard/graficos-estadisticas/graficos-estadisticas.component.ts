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
  turnosFiltradosFecha : Turnos[] = [];
  turnosFiltradosFechaFinalizados : Turnos[] = [];
  turnosPorMedicoFinalizados : any[] = [];

  constructor(private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.traerTurnos();
  }

  traerTurnos(){
    this.turnServ.traerTurnos().subscribe(
      t=>{
        this.todosLosTurnos = t;
        console.log(this.todosLosTurnos);
        
        this.todosLosTurnos.forEach(turno=>{
          //console.log(turno.medico.apellido);
          
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
    let hoy = new Date();

    let fechaAnterior = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate() - 14);
    this.todosLosTurnos.forEach(
      t=>{
        //console.log(this.formatearFecha(t.fecha));
        //console.log(t.fecha);
        
        let fechaTurno = this.formatearFecha(t.fecha);
        if(fechaTurno < hoy && fechaTurno > fechaAnterior){
          this.turnosFiltradosFecha.push(t);
          if(t.estado == 'realizado'){
            this.turnosFiltradosFechaFinalizados.push(t);
          }
        }
      }
    )
    //obtengo la cantidad de turnos por medico sin importar el estado
    for (let i = 0; i < this.idsMedico.length; i++) {
      let contador = 0;
      let medico = {
        "nombre" : this.idsMedico[i],
        "cantidad":contador
      }
      for (let j = 0; j < this.turnosFiltradosFecha.length; j++) {
        if(this.turnosFiltradosFecha[j].medico.id == this.idsMedico[i]){
          if(contador == 0){
            medico.nombre = `${this.turnosFiltradosFecha[j].medico.nombre} ${this.turnosFiltradosFecha[j].medico.apellido}`
          }
          contador++
        }
      }
      medico.cantidad = contador;
      this.turnosPorMedico.push(medico);      
    }

    //obtengo la cantidad de turnos por medico finalizados
    for (let i = 0; i < this.idsMedico.length; i++) {
      let contador = 0;
      let medico = {
        "nombre" : '',
        "cantidad":contador
      }      
      for (let j = 0; j < this.turnosFiltradosFechaFinalizados.length; j++) {
        if(this.turnosFiltradosFechaFinalizados[j].medico.id == this.idsMedico[i]){
          if(contador == 0){
            medico.nombre = `${this.turnosFiltradosFechaFinalizados[j].medico.nombre} ${this.turnosFiltradosFechaFinalizados[j].medico.apellido}`
          }
          contador++
        }
      }
      if(contador > 0){
        medico.cantidad = contador;
        this.turnosPorMedicoFinalizados.push(medico);
      }
    }
    // console.log(this.turnosPorMedico);
    // console.log(this.turnosPorMedicoFinalizados);
  }


  formatearFecha(fecha :string){
    let anio = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    let fechaParseada = new Date(anio+'/'+mes+'/'+dia);
    return fechaParseada;
  }


}
