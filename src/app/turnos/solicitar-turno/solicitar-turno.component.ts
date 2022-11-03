import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  
  paciente : Usuarios | any;
  medicoElegido !: Usuarios;
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
  formTurno !: FormGroup;
  esInvalido : boolean = true;
  nuevoTurno !: Turnos;
  
  constructor(private dispServ: DisponibilidadService, private turnosServ : TurnosService,private fb : FormBuilder, private auth : AuthService,private spinner: NgxSpinnerService,private userServ : UsuariosService) { 
    this.formTurno = this.fb.group({
      'especialidad':[],
      'medico':[],
      'fecha':[],
      'horario':[]
    })
  }

  ngOnInit(): void {
    this.cargarInfoPaciente();
    this.traerDisponibilidades();
  }

  cargarInfoPaciente(){
    this.auth.obtenerUsuarioLogueado().subscribe(
      async usuarioLogueado =>{
        this.paciente = await this.userServ.devolverDataUsuarioDB(usuarioLogueado?.uid);
      }
    )
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
    this.formTurno.get('especialidad')?.patchValue(especialidad);
    this.formTurno.get('medico')?.patchValue('');
    this.formTurno.get('fecha')?.patchValue('');
    this.formTurno.get('horario')?.patchValue('');
    this.esInvalido= true;

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
    this.formTurno.get('medico')?.patchValue(`${medico.nombre} ${medico.apellido}`);
    this.formTurno.get('fecha')?.patchValue('');
    this.formTurno.get('horario')?.patchValue('');
    this.medicoElegido = medico;
    this.esInvalido= true;

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

    this.fechas = this.turnosServ.obtenerFechasDelRango(hoy,fechaFutura);
    
    this.fechas.forEach(
      fecha=>{
        
        if(this.diasDelMedico.includes(this.dias[fecha.getDay()])){
          
          this.fechasDisponibles.push(`${this.dias[fecha.getDay()]}: ${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`)
        }
      }
    )
    
  }

  cargarTurnos(fecha:string){
    this.formTurno.get('horario')?.patchValue('');
    this.esInvalido= true;
    
    //console.log(fecha.split(':')[0]);
    this.horasLibres = []
    let diaElegido = fecha.split(':')[0];
    let fechaElegida = fecha.split(':')[1]
    
    this.formTurno.get('fecha')?.patchValue(fechaElegida.trim());
    
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

  cargarHora(horario:string){
    this.formTurno.get('horario')?.patchValue(horario);
    this.esInvalido= false;
  }

  async turnoNuevo(){
    //console.log(this.formTurno.value);
    this.nuevoTurno = {
      medico:this.medicoElegido,
      paciente:this.paciente,
      especialidad:this.formTurno.get('especialidad')?.value,
      estado:'solicitado',
      fecha:this.formTurno.get('fecha')?.value,
      horario:this.formTurno.get('horario')?.value,
      duracion:30,
      id:`${this.medicoElegido.id}-${this.paciente.id}-${Date.parse(this.formTurno.get('fecha')?.value)}-${this.formTurno.get('horario')?.value}`
    } 
    
    //console.log(Date.parse(this.nuevoTurno.fecha) );
    //antes de guardar verificar si hay un turno con el mismo id
    let existeTurno = await this.turnosServ.devolverTurnoDB(this.nuevoTurno.id)
    if(existeTurno){
      Swal.fire({
        title:`Ya existe un turno en ese horario.`,
        icon:'error',      
      })
    }else{
      this.turnosServ.guardarTurno(this.nuevoTurno);
      Swal.fire({
        title:`Se agendó su turno.`,
        icon:'success',      
      })
    }
    
    this.resetearTodo();
  }  
  
  resetearTodo(){
    this.medicosDisponibles = [];
    this.fechasFiltradasPorMedico = [];
    this.fechasDisponibles = [];
    this.diasDelMedico = [];
    this.horasLibres = []
    this.formTurno.get('especialidad')?.patchValue('');
    this.formTurno.get('medico')?.patchValue('');
    this.formTurno.get('fecha')?.patchValue('');
    this.formTurno.get('horario')?.patchValue('');
    this.esInvalido= true;
    this.formTurno.reset();
  }

}
