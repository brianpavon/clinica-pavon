import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'rol' ,'dni', 'email','estado'];
  todosLosUsuarios :Usuarios[] = [];
  histClinPaciente !: HistoriaClinica;

  constructor(private userServ:UsuariosService,private imgServ : ImagenService) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(){
    this.userServ.traerUsuarios().subscribe(
      usuarios=>{
        this.todosLosUsuarios = usuarios;
        this.todosLosUsuarios.forEach(
          usuario=>{
            this.imgServ.descargarImagen(usuario.fotoPerfil).subscribe(
              url=>{
                usuario.fotoPerfil = url;
              }
            )
          }
        )
        //console.log(this.todosLosUsuarios);
        
      }
    );
  }


  verHistClin(histClin:HistoriaClinica){
    this.histClinPaciente = histClin;
  }

  bajarInfoAtencion(paciente:Usuarios){
    console.log(paciente);
    
  }
}
