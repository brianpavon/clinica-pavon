import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children:[
      {path:'',component:PanelPrincipalComponent},
      {path:'**',redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }