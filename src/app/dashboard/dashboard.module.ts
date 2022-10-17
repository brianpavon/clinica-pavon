import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    PanelPrincipalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
