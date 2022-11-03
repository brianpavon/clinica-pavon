import { Component,  Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dia, Disponibilidad } from 'src/app/interfaces/disponibilidad';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios-especialista',
  templateUrl: './horarios-especialista.component.html',
  styleUrls: ['./horarios-especialista.component.css']
})
export class HorariosEspecialistaComponent implements OnInit {
  @Input() data : any;
  @Output() quitarEsp : EventEmitter<any> = new EventEmitter<any>();

  formDisponibilidad !: FormGroup;
  hayCheck : number = 0;
  horariosDesde : number[] = [8,9,10,11,12,13,14,15,16,17,18];
  horariosHasta : number[] = [9,10,11,12,13,14,15,16,17,18,19];
  nuevaDisponibilidad !: Disponibilidad;
  dias : Dia[] =[]
  dispoFirestore : Disponibilidad[] = [];

  constructor(private fb : FormBuilder,private dispServ : DisponibilidadService) {
    this.formDisponibilidad = this.fb.group({
      "lunes":[],
      "lunesDesde":[],
      "lunesHasta":[],
      "martes":[],
      "martesDesde":[],
      "martesHasta":[],
      "miercoles":[],
      "miercolesDesde":[],
      "miercolesHasta":[],
      "jueves":[],
      "juevesDesde":[],
      "juevesHasta":[],
      "viernes":[],
      "viernesDesde":[],
      "viernesHasta":[],
      "sabado":[],
      "sabadoDesde":[],
      "sabadoHasta":[],
    });
   }

  ngOnInit(): void {
  }
  
  
  checkDia(event:any){
    
    let diaCheck = event.checked;
    let id = event.source.name;

    if(diaCheck){
      if(id == 'sabado'){
        this.formDisponibilidad.get(`${id}Desde`)?.setValidators([Validators.required,Validators.min(8),Validators.max(13)]);
        this.formDisponibilidad.get(`${id}Hasta`)?.setValidators([Validators.required,Validators.max(14),Validators.min(9)]);
      }else{
        this.formDisponibilidad.get(`${id}Desde`)?.setValidators([Validators.required,Validators.min(8),Validators.max(18)]);
        this.formDisponibilidad.get(`${id}Hasta`)?.setValidators([Validators.required,Validators.max(19),Validators.min(9)]);
      }      
      this.formDisponibilidad.get(`${id}Desde`)?.updateValueAndValidity();
      this.formDisponibilidad.get(`${id}Hasta`)?.updateValueAndValidity();
      //este control es para ver si hay tildado algún día
      this.hayCheck++;
    }else{
      //cuando llegue a 0 se deshabilita el boton de guardar, porque no va haber ningún día tildado
      this.hayCheck--;
      //se sacan validaciones y se ponen los input sin valor
      this.formDisponibilidad.get(`${id}Desde`)?.clearValidators();
      this.formDisponibilidad.get(`${id}Desde`)?.patchValue('')
      this.formDisponibilidad.get(`${id}Desde`)?.updateValueAndValidity();

      this.formDisponibilidad.get(`${id}Hasta`)?.clearValidators();
      this.formDisponibilidad.get(`${id}Hasta`)?.patchValue('')
      this.formDisponibilidad.get(`${id}Hasta`)?.updateValueAndValidity();
    }
  }

  nuevaDispo(){
    //console.log(this.formDisponibilidad.value);   

    Object.keys(this.formDisponibilidad.controls).forEach(element=>{
      // console.log(element);
      // console.log(this.formDisponibilidad.get(element)?.value);      
      if(!element.includes('Hasta') && !element.includes('Desde')){
        if(this.formDisponibilidad.get(element)?.value){
          let dia = element;
          let desde = this.formDisponibilidad.get(`${element}Desde`)?.value;
          let hasta = this.formDisponibilidad.get(`${element}Hasta`)?.value;

          //guardo en formato hora
          let horaDesde = desde < 10 ? `0${desde}:00` : `${desde}:00`;
          let horaHasta = hasta < 10 ? `0${hasta}:00` : `${hasta}:00`;
          //los turnos son de media hora
          let cantTurnos = ( parseInt(horaHasta) - parseInt(horaDesde) )*2;
          let diaNuevo : Dia = {dia:dia,desde:horaDesde,hasta:horaHasta,cantTurnos:cantTurnos,duracion:30};
          //console.log(this.everyNminutes(30,desde,hasta));
          
          this.dias.push(diaNuevo);
        }
      }
    });   
    
    //console.log(this.nuevaDisponibilidad);
    this.nuevaDisponibilidad = {especialidad:  this.data.especSelecc,medico:this.data.user,dias:this.dias};
    //console.log(this.nuevaDisponibilidad);
    //guarda la disponibilidad
    this.dispServ.guardarDisponibilidad(this.nuevaDisponibilidad);
    
    Swal.fire({
      title:`Su disponibilidad fue guardada.`,
      icon:'success',      
    })
    setTimeout(() => {
      //@ts-ignore
      $('#exampleModal').modal('hide');      
    }, 1000);
    
    this.resetearForm()
    this.quitarEsp.emit(this.data.especSelecc);
  }
  


  validarHora(dia:string){
    let horaDesde = this.formDisponibilidad.get(`${dia}Desde`)?.value;
    let horaHasta = this.formDisponibilidad.get(`${dia}Hasta`)?.value;
    if(horaDesde == horaHasta || horaDesde > horaHasta){      
      this.formDisponibilidad.get(`${dia}Hasta`)?.setErrors({ 'igualMayor': true});
    }else{
      this.formDisponibilidad.get(`${dia}Hasta`)?.setErrors(null);
    }
  } 

  removeValidators(form: FormGroup) {
    for (const key in form.controls) {
        form.get(key)?.clearValidators();
        form.get(key)?.updateValueAndValidity();
    }
  }

  resetearForm(){
    this.hayCheck = 0;
    this.removeValidators(this.formDisponibilidad)
    this.formDisponibilidad.reset();
  }
  

}
