import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Turnos } from 'src/app/interfaces/turnos';
import { HistClinService } from 'src/app/services/hist-clin.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Input() turnoElegido !: Turnos;
  formHE !: FormGroup;
  nuevaHistClinica !: HistoriaClinica;

  constructor(private fb : FormBuilder,private hcServ : HistClinService,private userServ : UsuariosService,private turnServ : TurnosService) {
    this.formHE = this.fb.group({
      "altura" : ['',[Validators.required]],
      "peso": ['',[Validators.required]],
      "temp" : ['',[Validators.required]],
      "presion" : ['',[Validators.required]],      
      "dato1" : [],
      "valorDato1" : [],
      "dato2" : [],
      "valorDato2" : [],
      "dato3" : [],
      "valorDato3" : []
    })
   }

  ngOnInit(): void {
  }

  guardarHe(){
    //console.log(this.formHE.value);
    let altura = this.formHE.get('altura')?.value;
    let peso = this.formHE.get('peso')?.value;
    let temperatura = this.formHE.get('temp')?.value;
    let presion = this.formHE.get('presion')?.value;  
    let datoDinamico = {
      [this.formHE.get('dato1')?.value] : this.formHE.get('valorDato1')?.value,
      [this.formHE.get('dato2')?.value] : this.formHE.get('valorDato2')?.value,
      [this.formHE.get('dato3')?.value] : this.formHE.get('valorDato3')?.value,
    }
    //console.log(datoDinamico);
    for (const key in datoDinamico) {
      if (!key) {
        delete datoDinamico[key];
      }
    }
      
    
    this.nuevaHistClinica = {
      altura: altura,
      peso: peso,
      temperatura: temperatura,
      presion: presion,
      datosDinamicos :datoDinamico,
      turno:this.turnoElegido.id
    }
    let data = {
      historiaClinica:this.nuevaHistClinica
    }
    //console.log(this.nuevaHistClinica);
    this.turnServ.actualizarTurno(data,this.turnoElegido.id)
    this.userServ.actualizarUsuario(data,this.turnoElegido.paciente.id);
    this.formHE.reset();
    //@ts-ignore
    $('#modalHE').modal('hide');
    Swal.fire({
      title:`Historia Clínica guardada correctamente.`,
      icon:'success',      
    })
  }

}
