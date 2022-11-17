import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarFechasPipe } from './ordenar-fechas.pipe';
import { UltimaVisitaPipe } from './ultima-visita.pipe';
import { FiltroTablaPipe } from './filtro-tabla.pipe';



@NgModule({
  declarations: [
    OrdenarFechasPipe,
    UltimaVisitaPipe,
    FiltroTablaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarFechasPipe,
    UltimaVisitaPipe,
    FiltroTablaPipe
  ]
})
export class PipesModuleModule { }
