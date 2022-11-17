import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorTr]'
})
export class ColorTrDirective {
  @Input() appColorTr:string = "";
  constructor(private el:ElementRef) { }


  ngOnInit(){
    this.cambiarColorTr(this.el);
  }

  private cambiarColorTr(el:ElementRef) {
    if(this.appColorTr == 'rechazado'){
      this.el.nativeElement.style.backgroundColor = '#7b1fa2';
    }
   
  }
}
