import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rol : string = "";
  usuarioDB : any;
  constructor(private authServ:AuthService, private routes:Router, private userService : UsuariosService) {     
  }

  ngOnInit(): void {
    this.authServ.obtenerUsuarioLogueado().subscribe(async user=>{
      
        this.usuarioDB = await this.userService.devolverDataUsuarioDB(user?.uid);
        this.rol = this.usuarioDB?.rol;
    })
  }

  desloguearse(){
    this.authServ.logout();
    this.usuarioDB = '';
    this.rol = '';    
  }
}
