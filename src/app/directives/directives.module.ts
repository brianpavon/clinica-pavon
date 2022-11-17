import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorEstadosDirective } from './color-estados.directive';
import { ColorTrDirective } from './color-tr.directive';
import { BordesDirective } from './bordes.directive';



@NgModule({
  declarations: [
    ColorEstadosDirective,
    ColorTrDirective,
    BordesDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ColorEstadosDirective,
    ColorTrDirective,
    BordesDirective
  ]
})
export class DirectivesModule { }
