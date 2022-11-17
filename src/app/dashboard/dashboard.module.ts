import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { MaterialModule } from '../material/material.module';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilUsuarioModule } from '../perfil-usuario/perfil-usuario.module';
import { GraficosEstadisticasComponent } from './graficos-estadisticas/graficos-estadisticas.component';
import { LogLoginComponent } from './log-login/log-login.component';
import { PipesModuleModule } from '../pipes-module/pipes-module.module';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    DashboardComponent,
    PanelPrincipalComponent,
    EspecialistasComponent,
    UsuariosComponent,
    GraficosEstadisticasComponent,
    LogLoginComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    PerfilUsuarioModule,
    PipesModuleModule,
    DirectivesModule
  ]
})
export class DashboardModule { }
