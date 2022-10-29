import { Component, OnInit } from '@angular/core';
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

  constructor(private userServ : UsuariosService,private imgServ : ImagenService, private auth : AuthService){ 

  }

  ngOnInit(): void {
    this.cargaInfoUsuario();
  }

  cargaInfoUsuario(){
    this.auth.obtenerUsuarioLogueado().subscribe(
      async usuarioLogueado =>{
        this.dataUsuario = await this.userServ.devolverDataUsuarioDB(usuarioLogueado?.uid);
        //console.log(dataFirestore?.dni);
      }
    )
  }
}
