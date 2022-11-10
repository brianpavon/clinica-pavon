import { Component, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(private userServ : UsuariosService,private imgServ : ImagenService, private auth : AuthService,private dispServ : DisponibilidadService,private spinner: NgxSpinnerService){ 

  }

  ngOnInit(): void {
    this.spinner.show();
    this.cargaInfoUsuario();
    this.traerDisponibilidades();
  
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
        //console.log(typeof this.dataUsuario.historiaClinica.datosDinamicos);
        // if(this.dataUsuario.rol == 'medico'){
        //   this.especialidades = this.dataUsuario.especialidad;          
        // }
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


}
