import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {
  nuevosMedicos !: boolean;

  constructor(private userService : UsuariosService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.chequearNuevosMedicos();
    /** spinner starts on init */
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }

  chequearNuevosMedicos(){
    this.userService.traerUsuarios().subscribe(
      usuarios=>{
        (usuarios.filter(medico => medico.rol === "medico" && !medico.habilitado).length >0) ? this.nuevosMedicos=true : this.nuevosMedicos = false;
      }
    )
  }


}
