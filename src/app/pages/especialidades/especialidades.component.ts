import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { EspecialidadesService } from 'src/app/services/especialidades.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  listaEspecialidades : Especialidades[] = [];
  formEspecialidad:FormGroup;
  especialidadNueva !: Especialidades;
  @Output() especialidadSeleccionada : EventEmitter<any> = new EventEmitter<any>();

  constructor(private servEsp : EspecialidadesService, private fb : FormBuilder) {
    this.formEspecialidad = this.fb.group(
      {
        'descripcion':['',[Validators.required,Validators.minLength(5)]]
      }
    )
   }

  ngOnInit(): void {
    this.cargarEspecialidades();
    //console.log(this.listaEspecialidades.length);
  }

  cargarEspecialidades(){
    this.servEsp.traerTodasLasEspecialidades().subscribe(
      esp => {
        this.listaEspecialidades = esp;        
      }
    )
  }

  async nuevaEspecialidad(){
    this.especialidadNueva = this.formEspecialidad.value;
    
    //console.log(this.especialidadNueva);
    this.servEsp.guardarEspecialidad(this.especialidadNueva);
   
    this.formEspecialidad.reset();    
    //@ts-ignore
    $('#altaEspecialidad').modal('hide')
  }

  pasarEspecialidad(event:any){
    //console.log(especialidad);
    //console.log(event.checked);
    //let agrega = event.checked;
    //console.log(event.source.value);
    
    this.especialidadSeleccionada.emit(event);
  }

}
