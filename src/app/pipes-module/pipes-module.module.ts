import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarFechasPipe } from './ordenar-fechas.pipe';



@NgModule({
  declarations: [
    OrdenarFechasPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarFechasPipe
  ]
})
export class PipesModuleModule { }
