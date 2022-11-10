import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turnos } from 'src/app/interfaces/turnos';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  formHE !: FormGroup;
  @Input() turnoElegido !: Turnos;

  constructor(private fb : FormBuilder) {
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
    console.log(this.formHE.value);
    //@ts-ignore
    $('#modalHE').modal('hide')
  }

}
