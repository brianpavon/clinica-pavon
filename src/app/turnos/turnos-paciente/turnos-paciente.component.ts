import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.css']
})
export class TurnosPacienteComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'medico', 'especialidad', 'fecha','hora','estado','acciones'];

  turnosPaciente : Turnos[] = [];
  usuarioLogueado !: Usuarios | undefined;

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
        
      })
    })
  }

}
