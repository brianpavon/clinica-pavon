import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  todasLasDisp : Disponibilidad[] = []
  medicosDisponibles : Usuarios[] = [];
  especialidadesDisponibles : string[] = [];
  dispFiltradas : Disponibilidad[] = [];
  fechasFiltradasPorMedico : Disponibilidad[] = [];
  fechasDisponibles : string[] = [];
  fechas : Date[] = [];
  dias : string[] = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];  
  diasDelMedico : string[] = [];
  horasLibres : string[]  =[];
  
  constructor(private dispServ: DisponibilidadService, private turnosServ : TurnosService) { 

  }

  ngOnInit(): void {
    this.traerDisponibilidades();
  }

  traerDisponibilidades(){
    this.dispServ.traerDisponibilidades().subscribe(
      disp =>{
        
        this.todasLasDisp = disp;        
        this.todasLasDisp.forEach(d => {
          
          if(!this.especialidadesDisponibles.includes(d.especialidad)){
            this.especialidadesDisponibles.push(d.especialidad);
          }
        })
      }
    )
  }

  filtrarAlMedico(especialidad:string){
    ///this.dispFiltradas = this.todasLasDisp;
    this.medicosDisponibles = [];
    this.fechasFiltradasPorMedico = [];
    this.fechasDisponibles = [];
    this.diasDelMedico = [];
    this.horasLibres = []
    //console.log(this.dispFiltradas);
    
    this.dispFiltradas = this.todasLasDisp.filter(disp => disp.especialidad == especialidad);
    this.dispFiltradas.forEach(disp=>{
      if(!this.medicosDisponibles.includes(disp.medico)){
        this.medicosDisponibles.push(disp.medico);
      }
    })
    //console.log(this.dispFiltradas);
  }

  cargarFechas(medico:Usuarios){
    //console.log(this.dispFiltradas);
    this.fechasFiltradasPorMedico = [];
    this.fechasDisponibles = [];
    this.diasDelMedico = [];
    this.horasLibres = []
    
    //this.fechasFiltradasPorMedico = this.dispFiltradas;
    
    this.fechasFiltradasPorMedico = this.dispFiltradas.filter(d => d.medico.id == medico.id);
    //console.log(this.fechasFiltradasPorMedico);
    
    this.fechasFiltradasPorMedico.forEach(
      disp=>{
        disp.dias.forEach(
          d =>{            
            this.diasDelMedico.push(d.dia);
          }
        )        
      }
    )
    
    let hoy = new Date();

    let fechaFutura = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate() + 14);

    this.fechas = this.getDatesInRange(hoy,fechaFutura);
    
    this.fechas.forEach(
      fecha=>{
        
        if(this.diasDelMedico.includes(this.dias[fecha.getDay()])){
          
          this.fechasDisponibles.push(`${this.dias[fecha.getDay()]}: ${fecha.getDate()}/${fecha.getMonth()+1}`)
        }
      }
    )
    
  }

  cargarTurnos(fecha:string){
    //console.log(fecha.split(':')[0]);
    this.horasLibres = []
    let diaElegido = fecha.split(':')[0];
    this.fechasFiltradasPorMedico.forEach(
      disp=>{
        disp.dias.forEach(dia=>{
          //console.log(dia.dia);
          if(dia.dia == diaElegido){
            //console.log(`dia: ${dia.dia} desde:${dia.desde} hasta ${dia.hasta} duracion:${dia.duracion}`);
            let horaDesde = parseInt(dia.desde.split(':')[0]);
            let horaHasta = parseInt(dia.hasta.split(':')[0]);
            //console.log(this.turnosServ.definirTurnos(dia.duracion,horaDesde,horaHasta));            
            this.horasLibres = this.turnosServ.definirTurnos(dia.duracion,horaDesde,horaHasta);            
          }
        })        
      }
    )    
  }

  getDatesInRange(startDate:Date, endDate:Date){
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
    

}
