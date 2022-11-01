import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-horarios-especialista',
  templateUrl: './horarios-especialista.component.html',
  styleUrls: ['./horarios-especialista.component.css']
})
export class HorariosEspecialistaComponent implements OnInit {
  @Input() disponibilidad : any;
  lunesForm !: FormGroup;
  martesForm !: FormGroup;
  miercolesForm !: FormGroup;
  juevesForm !: FormGroup;
  viernesForm !: FormGroup;
  sabadoForm !: FormGroup;

  constructor(private fb : FormBuilder) {
    this.lunesForm = this.fb.group({});
   }

  ngOnInit(): void {    
  }
  
  
  checkDia(event:any){
    
    let diaCheck = event.checked;
    let id = event.source.name;
    // if(diaCheck)
    //   document.getElementById(`${id}Btn`)?.classList.remove('mat-button-disabled');
    // else
    //   document.getElementById(`${id}Btn`)?.classList.add('mat-button-disabled');
    //AGREGAS VALIDATORS A ESOS INPUT
    if(diaCheck){
      this.lunesForm.get(`${id}Desde`)?.setValidators([Validators.required,Validators.minLength(3)]);
      this.lunesForm.get(`${id}Desde`)?.updateValueAndValidity();
    }else{
      //sacas validaciones
    }
  }

  nuevaDispo(){
    console.log('test');
    
  }

}
