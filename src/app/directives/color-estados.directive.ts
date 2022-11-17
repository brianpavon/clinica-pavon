import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[estadoTurno]'
})
export class ColorEstadosDirective {
  
  @Input() estadoTurno:string = "";

  constructor(private el:ElementRef) { }

  ngOnInit(){
    this.cambiarColor(this.el);
  }

  private cambiarColor(el:ElementRef) {
    switch(this.estadoTurno){
      case 'rechazado':
        this.el.nativeElement.style.color = 'red';
        this.el.nativeElement.style.fontSize = 'larger'
        break;
      case 'cancelado':
        this.el.nativeElement.style.color = '#d15454';
        break;
      case 'solicitado':
        this.el.nativeElement.style.color = '#4fb4c2';
        break;
      case 'realizado':
        this.el.nativeElement.style.color = '#54c77a'; 
        break;
      case 'aceptado':
        this.el.nativeElement.style.color = '#cdd633'; 
        break;
    }
   
  }

}
