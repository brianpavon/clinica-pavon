import { Component, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Turnos } from 'src/app/interfaces/turnos';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  dataUsuario : Usuarios | any;
  objData : any;
  urlImg !: string;
  urlSegImg !:  string;
  especialidadesSinCargar : string[] = [];
  especialidadesCargadas : string[] = [];
  especialidadesDelMedico : string[] = [];
  dispoFirestore : Disponibilidad[] = [];
  dispoCargadas : Disponibilidad[] = [];
  pacienteLogueado : Usuarios | any;
  turnosPaciente !: Turnos[];
  idsMedicos : string[] = [];
  medicosPaciente : Usuarios[] = [];

  turnosPipe !: Turnos[];

  constructor(private userServ : UsuariosService,private imgServ : ImagenService, private auth : AuthService,private dispServ : DisponibilidadService,private spinner: NgxSpinnerService,private pdfServ : PdfServiceService,private turnServ : TurnosService){ 

  }

  ngOnInit(): void {
    this.spinner.show();
    this.cargaInfoUsuario();
    this.traerDisponibilidades();
    this.traerMisMedicos();
  
    setTimeout(() => {
      
      if(this.dataUsuario.rol == 'medico'){
        this.especialidadesDelMedico = this.dataUsuario.especialidad;
        this.dispoCargadas = this.dispoFirestore.filter(disp => disp.medico.id === this.dataUsuario.id);
        
        if(this.dispoCargadas.length > 0){
          this.dispoCargadas.forEach(disp => {            
            this.especialidadesCargadas.push(disp.especialidad)                      
          });
          this.especialidadesDelMedico.forEach(dispMed => {              
            if(!this.especialidadesCargadas.includes(dispMed)){
              this.especialidadesSinCargar.push(dispMed);
            }            
          });
        }else{
          this.especialidadesSinCargar = this.especialidadesDelMedico;
        }
      }
       /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3500);
  }

  cargaInfoUsuario(){
    this.auth.obtenerUsuarioLogueado().subscribe(
      async usuarioLogueado =>{
        this.dataUsuario = await this.userServ.devolverDataUsuarioDB(usuarioLogueado?.uid);
        
        //obtengo la imagen de perfil
        this.imgServ.descargarImagen(this.dataUsuario.fotoPerfil).subscribe(
          url=>{
            this.urlImg = url;
          }
        )
        if(this.dataUsuario.rol == 'paciente'){
          this.imgServ.descargarImagen(this.dataUsuario.fotoDos).subscribe(
            url=>{
              this.urlSegImg = url;
            }
          )
        }
      }
    )
  }

  traerMisMedicos(){
    this.auth.obtenerUsuarioLogueado().pipe(
      mergeMap(async res1 => this.pacienteLogueado = await this.userServ.devolverDataUsuarioDB(res1?.uid))
    ).subscribe(data =>{
      this.turnServ.traerTurnos().subscribe(turnos => {
        
        //console.log(turnos);        
        this.turnosPaciente = turnos.filter(t => t.paciente.id == data?.id && t.estado == 'realizado');
        this.turnosPipe = turnos.filter(t => t.paciente.id == data?.id && t.estado == 'realizado');
        
        //console.log(this.turnosMedico);
        this.turnosPaciente.forEach(
          tp=>{
            if(!this.idsMedicos.includes(tp.medico.id)){
              this.idsMedicos.push(tp.medico.id)
            }
          }
        )        
        
        for (let j = 0; j < this.idsMedicos.length; j++) {
          for (let i = 0; i < this.turnosPaciente.length; i++) {
            if(this.turnosPaciente[i].medico.id == this.idsMedicos[j]){
              
              this.medicosPaciente.push(this.turnosPaciente[i].medico);              
              break;
            }
          }
        }

      })
    })
  }

  pasarDisp(esp:any){
    this.objData = {
      user: this.dataUsuario,
      especSelecc: esp
    }
    //console.log(this.dispoNueva);    
  }

  sacarEsp(esp : string){
    this.especialidadesSinCargar = this.especialidadesSinCargar.filter(e=>e != esp);
    this.especialidadesCargadas.push(esp);    
  }

  traerDisponibilidades(){
    this.dispServ.traerDisponibilidades().subscribe(
      disp=>{
        this.dispoFirestore = disp;
        // console.log(this.dataUsuario);
        // while(!this.dataUsuario){
        //   this.especialidadesCargadas = this.dispoFirestore.filter(disp => disp.medico.id === this.dataUsuario.id);
        //   console.log(this.especialidadesCargadas);
        // }
        
      }
    )
  }

  bajarHistClinica(paciente:Usuarios){
    this.pdfServ.descargarHistClinica(paciente);
  }

  descargarAtencionPorMedico(medico:Usuarios){
    //console.log(medico);
    let turnosPaciente = this.turnosPaciente.filter(t=>t.medico.id == medico.id)
    
    //console.log(turnosPaciente);
    this.pdfServ.descargarTurnosPaciente(turnosPaciente);
    
  }


}
