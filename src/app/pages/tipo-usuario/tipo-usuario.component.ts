import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {
  @Output() tipoUsuario : EventEmitter<any> = new EventEmitter<any>();

  esAdmin : boolean = false;
  usuarioDB : any;

  constructor(private usuarioServ : UsuariosService,private authFire:AngularFireAuth) { 
    //Para ver si es admin y puede generar otros admins
    this.authFire.authState.subscribe(
      async user=>{
        if(user && user?.email == 'admin@mail.com'){
          this.esAdmin = true;
        }else if(user){
          this.usuarioDB = await this.usuarioServ.devolverDataUsuarioDB(user?.uid);
          if(this.usuarioDB.rol == 'admin'){
            this.esAdmin = true;
          }
        }          
      }
    )
  }

  ngOnInit(): void {
  }
  cargarTipoUsuario(usuario:string){
    this.tipoUsuario.emit(usuario);
  }

}
