import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioVerificado : boolean = false;
  esAdmin : boolean = false;
  listaUsuarios : Usuarios[] = [];
  pacientes : number = 3;
  medicos : number = 2;

  constructor(private spinner: NgxSpinnerService,private auth :AuthService,private routes : Router,private userServ : UsuariosService, private imgServ : ImagenService) { }

  ngOnInit(): void {
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);    
    this.cargarIngresoRapido();
  }

  redirectToHome() {
    this.routes.navigate(['/home']);    
  }

  async login(email: string, password: string) {
    try {    
      
      await this.auth.login(email, password);      
      
      this.listaUsuarios  = [];
      this.pacientes  = 3;
      this.medicos  = 2;  
      
    } catch (error: any) {
      this.auth.thrownErrorsLogin(error.code);
    }
  }

  cargarIngresoRapido(){    
    this.userServ.traerUsuarios().subscribe(
      usuarios =>{
        //console.log(usuarios);
        usuarios.forEach(usuario => {          
          if(usuario.email == "admin@mail.com" && this.listaUsuarios.length < 6){
            this.listaUsuarios.push(usuario);
          }
          //el paciente tiene 2 fotos, asi que tomo la primera
          if(usuario.rol == 'paciente' && this.pacientes > 0 && usuario.email !='sofiarodriguez95@hotmail.com'){
            //usuario.fotos = usuario.fotos.split(',')[0];
            this.listaUsuarios.push(usuario);
            this.pacientes--;
          }
          if(usuario.rol == 'medico' && this.medicos>0 && usuario.email != 'micaweilenmann@gmail.com'){
            this.listaUsuarios.push(usuario);
            this.medicos--;
          }
          
          this.imgServ.descargarImagen(usuario.fotoPerfil).subscribe(
            url =>{
              usuario.fotoPerfil = url;
              //console.log(url);
            }
          )
        });
        
      }
    )
  }

}
