import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turnos } from 'src/app/interfaces/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-encuesta',
  templateUrl: './modal-encuesta.component.html',
  styleUrls: ['./modal-encuesta.component.css']
})
export class ModalEncuestaComponent implements OnInit {

  @Input() turnoEncuesta !: Turnos;
  formEncuesta !: FormGroup;

  constructor(private turnServ : TurnosService,private fb : FormBuilder) { 
    this.formEncuesta = this.fb.group({
        "califEspec" : ['',[Validators.required]],
        "califClinica" : ['',[Validators.required]],
        "sugerencias":[]
      }
    )
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {    
    return value;
  }

  guardarEncuesta(){
    //console.log(this.formEncuesta.value,this.turnoEncuesta);    
    
    let data = {
      encuesta: this.formEncuesta.value
    }
    
    
    this.turnServ.actualizarTurno(data,this.turnoEncuesta.id);
    Swal.fire({
      title:`Se guardó la Encuesta.`,
      icon:'success',      
    })
    setTimeout(() => {
      //@ts-ignore
      $('#modalEncuesta').modal('hide');      
    }, 1000);
    
    this.resetForm();
  }

  resetForm(){
    this.formEncuesta.reset();
  }

}
