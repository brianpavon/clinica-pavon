import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarFechasPipe } from './ordenar-fechas.pipe';
import { UltimaVisitaPipe } from './ultima-visita.pipe';



@NgModule({
  declarations: [
    OrdenarFechasPipe,
    UltimaVisitaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarFechasPipe,
    UltimaVisitaPipe
  ]
})
export class PipesModuleModule { }
