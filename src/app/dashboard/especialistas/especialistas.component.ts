import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {  
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email','especialidad','estado','habilitado'];
  todosLosMedicos :Usuarios[] = [];
  
  constructor(private userServ:UsuariosService) { }

  ngOnInit(): void {
    this.cargarEspecialistas();
    
  }

  cargarEspecialistas(){
    this.userServ.traerUsuarios().subscribe(
      usuarios=>{
        this.todosLosMedicos = usuarios;
        this.todosLosMedicos = this.todosLosMedicos.filter(medico => medico.rol === "medico");        
      }
    );
    
  }

  cambiarEstados(event:any,id:any){
    //console.log(event.source.name);
    let atributo = event.source.name;
    let valor = event.checked;
    const data = {   
      [atributo]: valor
  
    };
    //console.log(data);
    this.userServ.actualizarUsuario(data,id);
  }
 
}
