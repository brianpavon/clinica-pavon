import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorEstadosDirective } from './color-estados.directive';
import { ColorTrDirective } from './color-tr.directive';



@NgModule({
  declarations: [
    ColorEstadosDirective,
    ColorTrDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ColorEstadosDirective,
    ColorTrDirective
  ]
})
export class DirectivesModule { }
