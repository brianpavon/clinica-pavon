import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { MaterialModule } from '../material/material.module';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilUsuarioModule } from '../perfil-usuario/perfil-usuario.module';


@NgModule({
  declarations: [
    DashboardComponent,
    PanelPrincipalComponent,
    EspecialistasComponent,
    UsuariosComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    PerfilUsuarioModule
  ]
})
export class DashboardModule { }
