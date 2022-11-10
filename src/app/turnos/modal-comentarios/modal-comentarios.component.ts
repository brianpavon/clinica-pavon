import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-comentarios',
  templateUrl: './modal-comentarios.component.html',
  styleUrls: ['./modal-comentarios.component.css']
})
export class ModalComentariosComponent implements OnInit {

  @Input() turnoElegido : any;
  formComentario !: FormGroup;  

  constructor(private turnServ : TurnosService,private fb : FormBuilder) {
    this.formComentario = this.fb.group({
      "comentario" :['',[Validators.required,Validators.minLength(10)]]
    })
    
  }

  ngOnInit(): void {
  }

  guardarComentario(){
    let data;
    if(this.turnoElegido.estado == 'calificar'){
      data = {
        calificacion:this.formComentario.get('comentario')?.value,        
      }
    }else{
      data = {
        comentario:this.formComentario.get('comentario')?.value,
        estado:this.turnoElegido.estado
      }
    }
    //console.log(data);
    this.turnServ.actualizarTurno(data,this.turnoElegido.turno.id);
    if(this.turnoElegido.estado == 'realizado'){
      Swal.fire({
        title:`Se actualizó el turno y el comentario fue guardado.\n Recuerde que debe completar la Historia Clínica.`,
        icon:'success',      
      })
    }else{
      Swal.fire({
        title:`Se actualizó el turno y el comentario fue guardado.`,
        icon:'success',      
      })
    }
    setTimeout(() => {
      //@ts-ignore
      $('#modalComentarios').modal('hide');      
      if(this.turnoElegido.estado == 'realizado'){
        //@ts-ignore
        $('#modalHE').modal('show')
      }
    }, 1000);
    
    this.resetearForm()
    
  }

  resetearForm(){
    this.formComentario.reset();
  }

  guardarHe(){

  }

}
