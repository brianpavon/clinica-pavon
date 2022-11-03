import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-turnos-medico',
  templateUrl: './turnos-medico.component.html',
  styleUrls: ['./turnos-medico.component.css']
})
export class TurnosMedicoComponent implements OnInit {

  displayedColumns: string[] = ['paciente', 'especialidad', 'fecha','hora','estado','acciones'];

  turnosMedico : Turnos[] = [];
  medicoLogueado !: Usuarios | undefined;

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

}
