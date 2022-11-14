import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Turnos } from 'src/app/interfaces/turnos';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pacientes-atendidos',
  templateUrl: './pacientes-atendidos.component.html',
  styleUrls: ['./pacientes-atendidos.component.css']
})
export class PacientesAtendidosComponent implements OnInit {

  turnosMedico !: Turnos[];
  medicoLogueado !: Usuarios | undefined;
  pacientesAtendidos : Usuarios[] = [];
  pacientesAtendidosAux : string[] = [];
  displayedColumns: string[] = ['fecha', 'especialidad', 'acciones'];
  detalleTurnosPaciente : Turnos[] = []
  turnoResenia !: any;
  historiaClinicaPac !: any;

  constructor(private userServ : UsuariosService,private authServ : AuthService, private turnServ : TurnosService,private imgServ : ImagenService) { 

  }

  ngOnInit(): void {
    this.traerMisPacientes();
  }

  traerMisPacientes(){
    this.authServ.obtenerUsuarioLogueado().pipe(
      mergeMap(async res1 => this.medicoLogueado = await this.userServ.devolverDataUsuarioDB(res1?.uid))
    ).subscribe(data =>{
      this.turnServ.traerTurnos().subscribe(turnos => {
        
        //console.log(turnos);        
        this.turnosMedico = turnos.filter(t => t.medico.id == data?.id && t.estado == 'realizado')
        
        //console.log(this.turnosMedico);
        this.turnosMedico.forEach(
          tm=>{
            if(!this.pacientesAtendidosAux.includes(tm.paciente.id)){
              this.pacientesAtendidosAux.push(tm.paciente.id)
            }
          }
        )
        
        //console.log(this.pacientesAtendidosAux);
        for (let j = 0; j < this.pacientesAtendidosAux.length; j++) {
          for (let i = 0; i < this.turnosMedico.length; i++) {
            if(this.turnosMedico[i].paciente.id == this.pacientesAtendidosAux[j]){
              
              this.pacientesAtendidos.push(this.turnosMedico[i].paciente);              
              break;
            }
          }
        }

        //traemos las fotos de perfil
        this.pacientesAtendidos.forEach(
          pac=>{            
            this.imgServ.descargarImagen(pac.fotoPerfil).subscribe(
              url=>{
                pac.fotoPerfil = url;
              }
            )
          }
        )

      })
    })
  }

  verTurnosPaciente(id : number){
    this.detalleTurnosPaciente = this.turnosMedico.filter(t=> t.paciente.id == id);
    //console.log(this.detalleTurnosPaciente);
  }

  verResenia(turno : Turnos){
    this.turnoResenia = turno;
    this.turnoResenia.verResenia = true;
  }

  async verHistClin(paciente : Usuarios){
    let pacAux = await this.userServ.devolverDataUsuarioDB(paciente.id.toString())
    
    this.historiaClinicaPac = pacAux?.historiaClinica;
    
  }

}
