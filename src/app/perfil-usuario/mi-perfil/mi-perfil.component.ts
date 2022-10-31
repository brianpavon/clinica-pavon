import { Component, OnInit, } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  dataUsuario : Usuarios | any;
  especialidades : string[] = [];
  dispoNueva : any;
  urlImg !: string;
  urlSegImg !:  string;  

  constructor(private userServ : UsuariosService,private imgServ : ImagenService, private auth : AuthService){ 

  }

  ngOnInit(): void {
    this.cargaInfoUsuario();
  }

  cargaInfoUsuario(){
    this.auth.obtenerUsuarioLogueado().subscribe(
      async usuarioLogueado =>{
        this.dataUsuario = await this.userServ.devolverDataUsuarioDB(usuarioLogueado?.uid);
        //console.log(this.dataUsuario?.especialidad);
        if(this.dataUsuario.rol == 'medico'){
          this.especialidades = this.dataUsuario.especialidad;
        }
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

  pasarDisp(esp:string){
    this.dispoNueva = {
      user: this.dataUsuario,
      especSelecc: esp
    }
    //console.log(this.dispoNueva);    
  }


}
