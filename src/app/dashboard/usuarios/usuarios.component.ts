import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email','estado'];
  todosLosPacientes :Usuarios[] = [];

  constructor(private userServ:UsuariosService) { }

  ngOnInit(): void {
    this.cargarEspecialistas();
  }

  cargarEspecialistas(){
    this.userServ.traerUsuarios().subscribe(
      usuarios=>{
        this.todosLosPacientes = usuarios;
        this.todosLosPacientes = this.todosLosPacientes.filter(paciente => paciente.rol === "paciente");        
      }
    );
  }
}
