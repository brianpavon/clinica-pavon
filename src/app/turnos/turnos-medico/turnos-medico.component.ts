import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos-medico',
  templateUrl: './turnos-medico.component.html',
  styleUrls: ['./turnos-medico.component.css']
})
export class TurnosMedicoComponent implements OnInit {

  displayedColumns: string[] = ['paciente', 'especialidad', 'fecha','hora','estado','acciones'];

  turnosMedico : Turnos[] = [];
  medicoLogueado !: Usuarios | undefined;
  turnosAux : Turnos[] = [];
  turnoModal !: any;

  constructor(private auth:AuthService,private userServ : UsuariosService,private turnServ : TurnosService) { }

  ngOnInit(): void {
    this.cargarTurnosMedico()
  }

  cargarTurnosMedico(){
    
    this.auth.obtenerUsuarioLogueado().pipe(
      mergeMap(async res1 => this.medicoLogueado = await this.userServ.devolverDataUsuarioDB(res1?.uid))
    ).subscribe(data =>{
      this.turnServ.traerTurnos().subscribe(turnos => {
        //console.log(turnos);
        
        this.turnosMedico = turnos.filter(t => t.medico.id == data?.id)
        //console.log(this.turnosPaciente);
        
      })
    })    
  }

  filtrarTabla(event: Event | any) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    let filtrar = true;
    
    if(filterValue.length == 1 && event.key != 'Backspace'){
      this.turnosAux = this.turnosMedico;      
      
      //console.log('entro');      
    }else if(filterValue.length == 0 && event.key == 'Backspace'){
      this.turnosMedico = this.turnosAux;
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
          if(t.paciente.nombre.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.paciente.apellido.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
        }
      )
      this.turnosMedico = turnosFiltrados;
    }
    
  }

  modificarEstado(turno:Turnos,estado:string){
    
    const data = {   
      estado: estado
    };
    this.turnServ.actualizarTurno(data,turno.id);
    Swal.fire({
      title:`El turno fue ${estado}.`,
      icon:'success',      
    })
  }

  cargarComentarios(turno:Turnos,estado:string){
    this.turnoModal = {turno: turno,estado:estado}
  }

  verReseniaTurno(turno:Turnos){
    console.log(turno);
    
  }

}
