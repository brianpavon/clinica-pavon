import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.css']
})
export class TurnosPacienteComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'medico', 'especialidad', 'fecha','hora','estado','acciones'];

  turnosPaciente : Turnos[] = [];
  usuarioLogueado !: Usuarios | undefined;
  dataSource !: any
  turnosAux : Turnos[] = [];
  turnoElegido !: any;
  verTurno !: any;

  constructor(private auth:AuthService,private userServ : UsuariosService,private turnServ : TurnosService) { 

  }

  ngOnInit(): void {
    this.cargarTurnosPaciente()
  }

  cargarTurnosPaciente(){
    
    this.auth.obtenerUsuarioLogueado().pipe(
      mergeMap(async res1 => this.usuarioLogueado = await this.userServ.devolverDataUsuarioDB(res1?.uid))
    ).subscribe(data =>{
      this.turnServ.traerTurnos().subscribe(turnos => {
        //console.log(turnos);
        
        this.turnosPaciente = turnos.filter(t => t.paciente.id == data?.id)
        //console.log(this.turnosPaciente);
        this.dataSource = new MatTableDataSource(this.turnosPaciente);
        
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrarTabla(event: Event | any) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    let filtrar = true;
    
    if(filterValue.length == 1 && event.key != 'Backspace'){
      this.turnosAux = this.turnosPaciente;      
      
      //console.log('entro');      
    }else if(filterValue.length == 0 && event.key == 'Backspace'){
      this.turnosPaciente = this.turnosAux;
      filtrar=false;
    }
    //console.log(this.turnosAux);
    
    if(filtrar){
      //console.log(this.todosLosTurnos);
      let turnosFiltrados : Turnos[] = [];
      
      this.turnosAux.forEach(
        t=>{
          if(t.especialidad.toLowerCase().includes(filterValue)){
            //console.log('entro');            
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.medico.nombre.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.medico.apellido.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
        }
      )
      this.turnosPaciente = turnosFiltrados;
    }
    
  }

  cargarComentarios(turno:Turnos,estado:string){
    this.turnoElegido = {turno: turno,estado:estado}
  }

  verReseniaTurno(turno:Turnos){
    //console.log(turno);
    this.verTurno = turno;    
  }

}
