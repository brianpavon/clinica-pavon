import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import { Chart, registerables } from 'chart.js/auto';
import { PdfServiceService } from 'src/app/services/pdf-service.service';

Chart.register(...registerables)

@Component({
  selector: 'app-graficos-estadisticas',
  templateUrl: './graficos-estadisticas.component.html',
  styleUrls: ['./graficos-estadisticas.component.css']
})
export class GraficosEstadisticasComponent implements OnInit {
  
  todosLosTurnos : Turnos[] = [];
  totalDeTurnos : number = 0;
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

  chartGraficoEspecialidad : any;
  chartGraficoFecha : any;
  chartGraficoMedico : any;
  chartGraficoMedicoFinalizado : any;

  //graficos
  canvas : any;
  ctx : any;
  @ViewChild('graficoPorEspecialidad') graficoPorEspecialidad !: ElementRef;
  @ViewChild('graficoPorFecha') graficoPorFecha !: ElementRef;
  @ViewChild('graficoPorMedico') graficoPorMedico !: ElementRef;
  @ViewChild('graficoPorMedicoFinalizado') graficoPorMedicoFinalizado !: ElementRef;

  constructor(private turnServ : TurnosService,private pdfServ : PdfServiceService) { }

  ngOnInit(): void {
    this.traerTurnos();
    
  }

  traerTurnos(){
    
    this.turnServ.traerTurnos().subscribe(
      t=>{
        this.todosLosTurnos = t;
        //console.log(this.todosLosTurnos);
        this.totalDeTurnos = this.todosLosTurnos.length;
        //console.log(this.totalDeTurnos);
        
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
        this.graficoPorEspecialidades();

        this.totalTurnosPorFecha();
        this.graficoPorFechas();

        this.totalTurnosPorMedico();
        this.graficoParaMedicos();
        this.graficoParaMedicosTurnosFinalizados();
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

  getRandomRgb() {
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  crearKeyValueTurnoEspecialidad(){
    //console.log(this.getRandomRgb());
    
    let espec : string[] = [];
    let valores : string[] = [];
    let colores: string[] = [];

    this.turnosPorEspecialidad.forEach(element => {
      espec.push(element.especialidad);
      valores.push(element.cantidad)
    });
    for (let i = 0; i < this.turnosPorEspecialidad.length; i++) {
      colores.push(this.getRandomRgb())
    }
    return {espec,valores,colores};
  }

  crearKeyValueTurnosPorFecha(){
    let fechas : string[] = [];
    let valores : string[] = [];
    let colores: string[] = [];

    this.turnosPorFechas.forEach(element => {
      fechas.push(element.fecha);
      valores.push(element.cantidad)
    });
    for (let i = 0; i < this.turnosPorFechas.length; i++) {
      colores.push(this.getRandomRgb())
    }
    return {fechas,valores,colores};
  }

  crearKeyValueTurnosPorMedico(){
    let nombres : string[] = [];
    let valores : string[] = [];       
    let colores : string[] = [];       

    this.turnosPorMedico.forEach(element => {
      nombres.push(element.nombre);
      valores.push(element.cantidad)
    });
    for (let i = 0; i < this.turnosPorMedico.length; i++) {
      colores.push(this.getRandomRgb())
    }
    return {nombres,valores,colores};
  }

  crearKeyValueTurnosPorMedicoFinalizados(){
    let nombres : string[] = [];
    let valores : string[] = [];
    let colores : string[] = [];

    this.turnosPorMedicoFinalizados.forEach(element => {
      nombres.push(element.nombre);
      valores.push(element.cantidad)
    });
    for (let i = 0; i < this.turnosPorMedicoFinalizados.length; i++) {
      colores.push(this.getRandomRgb())
    }
    return {nombres,valores,colores};
  }


  graficoPorEspecialidades(){
    let dataGrafico = this.crearKeyValueTurnoEspecialidad();
    //console.log(dataGrafico.espec);
    
    this.canvas = this.graficoPorEspecialidad.nativeElement;        
    this.ctx = this.canvas.getContext('2d');

    this.chartGraficoEspecialidad = new Chart(this.ctx, 
      {
        type: 'bar',
        data: {
          datasets: 
          [
            {
              label: 'Cantidad de Turnos',
              data: [...dataGrafico.valores],
              backgroundColor: [...dataGrafico.colores],              
            }
          ],
          labels: [...dataGrafico.espec]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
  }

  graficoPorFechas(){
    let dataGrafico = this.crearKeyValueTurnosPorFecha();
    //console.log(dataGrafico.espec);
    
    this.canvas = this.graficoPorFecha.nativeElement;        
    this.ctx = this.canvas.getContext('2d');

    this.chartGraficoFecha = new Chart(this.ctx, 
      {
        type: 'bar',
        data: {
          datasets: 
          [
            {
              label: 'Cantidad de turnos:',
              data: [...dataGrafico.valores],
              backgroundColor:[...dataGrafico.colores]
            }
          ],
          labels: [...dataGrafico.fechas]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
  }
  
  graficoParaMedicos(){
    let dataGrafico = this.crearKeyValueTurnosPorMedico();
    //console.log(dataGrafico.espec);
    
    this.canvas = this.graficoPorMedico.nativeElement;        
    this.ctx = this.canvas.getContext('2d');

    this.chartGraficoMedico = new Chart(this.ctx, 
      {
        type: 'pie',
        data: {
          datasets: 
          [
            {
              label: 'Total de Turnos',
              data: [...dataGrafico.valores],
              backgroundColor: [...dataGrafico.colores]
            }
          ],
          labels: [...dataGrafico.nombres]
        },        
      });
  }

  graficoParaMedicosTurnosFinalizados(){
    let dataGrafico = this.crearKeyValueTurnosPorMedicoFinalizados();
    //console.log(dataGrafico.espec);
    
    this.canvas = this.graficoPorMedicoFinalizado.nativeElement;        
    this.ctx = this.canvas.getContext('2d');

    this.chartGraficoMedicoFinalizado = new Chart(this.ctx, 
      {
        type: 'doughnut',
        data: {
          datasets: 
          [
            {
              label: 'Total de Turnos',
              data: [...dataGrafico.valores],
              backgroundColor: [...dataGrafico.colores]
            }
          ],
          labels: [...dataGrafico.nombres]
        }
      });
  }

  descargarGraficoPDF(grafico : string){
  
    switch (grafico) {
      case 'especialidad':
        //console.log(grafico);
        this.pdfServ.descargarGraficoBar(this.chartGraficoEspecialidad.toBase64Image('image/png,1'),'Turnos Por Especialidad');
        break;
      
      case 'fecha':
        //console.log(grafico);
        this.pdfServ.descargarGraficoBar(this.chartGraficoFecha.toBase64Image('image/png,1'),'Turnos Por Fechas');
        break;
      
      case 'medico':
        //console.log(grafico);
        this.pdfServ.descargarGraficoRedondos(this.chartGraficoMedico.toBase64Image('image/png,1'),'Turnos Por Medicos');
        break;

      case 'medicoFinalizado':
        //console.log(grafico);
        this.pdfServ.descargarGraficoRedondos(this.chartGraficoMedicoFinalizado.toBase64Image('image/png,1'),'Turnos Realizados por Medico');
        break;
    
      default:
        break;
    }
  }

}
