import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  @Output() captcha : EventEmitter<any> = new EventEmitter<any>();
  listaOpciones : string[] = ['auto','camioneta','avion','tractor'];
  opcionesDesordenadas : string [] = [];
  constructor() { }

  ngOnInit(): void {
    this.desordenarOpciones();
  }

  validarCaptcha(vehiculo:string){
    let captchaValido = vehiculo == 'auto';
    if(!captchaValido){
      Swal.fire({
        title: 'Captcha erróneo',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      });
      this.opcionesDesordenadas = [];
      this.desordenarOpciones();
    }else{
      this.captcha.emit(captchaValido);
    }
  }

  desordenarOpciones(){

    //console.log(this.opcionesDesordenadas);
    this.opcionesDesordenadas.push(this.listaOpciones[this.devolverNumeroRandom(0,3)]);
    //console.log(this.opcionesDesordenadas);
    while (this.opcionesDesordenadas.length != this.listaOpciones.length) {
      let opcion = this.listaOpciones[this.devolverNumeroRandom(0,3)]
      if(!this.opcionesDesordenadas.includes(opcion)){
        this.opcionesDesordenadas.push(opcion)
      }
    }
    //console.log(this.opcionesDesordenadas);
  }

  devolverNumeroRandom(min:number,max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


}
