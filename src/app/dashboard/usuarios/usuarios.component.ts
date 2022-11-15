import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { ImagenService } from 'src/app/services/imagen.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { TurnosService } from 'src/app/services/turnos.service';
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
  todosLosTurnos : Turnos [] = []

  constructor(private userServ:UsuariosService,private imgServ : ImagenService, private pdfServ : PdfServiceService, private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.cargarPacientes();
    this.traerTurnos();
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

  traerTurnos(){
    this.turnServ.traerTurnos().subscribe(
      t=>{
        this.todosLosTurnos = t;
      }
    )
  }


  verHistClin(histClin:HistoriaClinica){
    this.histClinPaciente = histClin;
  }

  bajarInfoAtencion(paciente:Usuarios){
    //this.pdfServ.descargarHistClinica(paciente);
    let turnosPaciente = this.todosLosTurnos.filter(t=>t.paciente.id == paciente.id)
    
    //console.log(turnosPaciente);
    this.pdfServ.descargarTurnosPaciente(turnosPaciente);
    
  }
}
