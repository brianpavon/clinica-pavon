import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-horarios-especialista',
  templateUrl: './horarios-especialista.component.html',
  styleUrls: ['./horarios-especialista.component.css']
})
export class HorariosEspecialistaComponent implements OnInit {
  @Input() disponibilidad : any;

  constructor() { }

  ngOnInit(): void {    
  }
  
  
  checkDia(event:any){
    //console.log(event.source.name);
    let diaCheck = event.checked;
    let id = event.source.name;
    if(diaCheck)
      document.getElementById(`${id}Btn`)?.classList.remove('mat-button-disabled');
    else
      document.getElementById(`${id}Btn`)?.classList.add('mat-button-disabled');
  }

  nuevaDispo(){
    console.log('test');
    
  }
}
