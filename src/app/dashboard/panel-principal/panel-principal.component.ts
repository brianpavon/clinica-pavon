import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {
  nuevosMedicos !: boolean;

  constructor(private userService : UsuariosService) { }

  ngOnInit(): void {
    this.chequearNuevosMedicos();
  }

  chequearNuevosMedicos(){
    this.userService.traerUsuarios().subscribe(
      usuarios=>{
        (usuarios.filter(medico => medico.rol === "medico" && !medico.habilitado).length >0) ? this.nuevosMedicos=true : this.nuevosMedicos = false;
      }
    )
  }


}
