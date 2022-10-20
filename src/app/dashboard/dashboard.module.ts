import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { MaterialModule } from '../material/material.module';
import { EspecialistasComponent } from './especialistas/especialistas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PanelPrincipalComponent,
    EspecialistasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
