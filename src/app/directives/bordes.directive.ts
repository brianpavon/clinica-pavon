import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBordes]'
})
export class BordesDirective {

  constructor(private el:ElementRef) { 
    this.colorRandom()
  }

  colorRandom(){
    let color = this.getRandomRgb();
    this.el.nativeElement.style.border =`2px solid ${color}`;
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.padding = '4px';

  }

  getRandomRgb() {
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

}
