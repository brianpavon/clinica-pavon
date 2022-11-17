import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarFechasPipe } from './ordenar-fechas.pipe';
import { UltimaVisitaPipe } from './ultima-visita.pipe';
import { FiltroTablaPipe } from './filtro-tabla.pipe';
import { FiltroHistoriaClinicaPipe } from './filtro-historia-clinica.pipe';



@NgModule({
  declarations: [
    OrdenarFechasPipe,
    UltimaVisitaPipe,
    FiltroTablaPipe,
    FiltroHistoriaClinicaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarFechasPipe,
    UltimaVisitaPipe,
    FiltroTablaPipe,
    FiltroHistoriaClinicaPipe
  ]
})
export class PipesModuleModule { }
