import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipoUsuario:string = '';  
  formRegistro:FormGroup;
  nuevoUsuario !: Usuarios;
  fotoPerfil !: File;
  segundaFoto !:File;
  pathFotoPerfil : string = '';
  pathSegundaFoto : string = '';
  especialidades : string[] = [];
  esPersona : boolean = false;

  constructor(private fb : FormBuilder,private spinner : NgxSpinnerService,private usuarioServ : UsuariosService,private auth : AuthService,private imgServ : ImagenService) {
    this.formRegistro = this.fb.group(
      {
        'nombre':['',[Validators.required,Validators.minLength(5),Validators.pattern('^[A-Za-z ]*')]],
        'apellido':['',[Validators.required,Validators.minLength(5)]],
        'edad':['',[Validators.required,Validators.min(1),Validators.max(120),Validators.pattern('^[0-9]*')]],
        'dni':['',[Validators.required,Validators.minLength(6),Validators.pattern('^[0-9]*')]],
        'email': ['',[Validators.required,Validators.email]],
        'clave':['',[Validators.required,Validators.minLength(6)]],        
        'obraSocial': ['',[Validators.required,Validators.minLength(3)]],
        'especialidad' : ['',[Validators.required]],
        'fotoDos' : ['',[Validators.required]],
        'fotoPerfil' : ['',[Validators.required]],
        'captcha' : ['',[Validators.required]]
      }
    );
  }

  ngOnInit(): void {
        
  }

  async crearUsuario(){
    //console.log(this.formRegistro.value);
    delete this.formRegistro.value.segundaImagen;
    delete this.formRegistro.value.fotoPerfil;
    delete this.formRegistro.value.captcha;
    this.nuevoUsuario = this.formRegistro.value;
    this.nuevoUsuario.rol = this.tipoUsuario;
    // console.log(this.nuevoUsuario);
    // console.log(typeof this.nuevoUsuario.especialidad);
    
    
    this.tipoUsuario == 'paciente' ? delete this.nuevoUsuario.especialidad : delete this.nuevoUsuario.obraSocial;
    if(this.tipoUsuario == 'admin'){      
      delete this.nuevoUsuario.especialidad;
    }
    this.nuevoUsuario.fotoPerfil = this.pathFotoPerfil;
    this.nuevoUsuario.fotoDos = (this.tipoUsuario == 'paciente') ? this.pathSegundaFoto : "";
    try {
      await this.auth.register(this.nuevoUsuario.email,this.nuevoUsuario.clave);      
      this.nuevoUsuario.id = this.auth.userFirebase.uid;
      //console.log(this.auth.userFirebase.uid);
      
      if(this.tipoUsuario == 'paciente'){
        delete this.nuevoUsuario.habilitado;
        this.imgServ.guardarImagen(this.fotoPerfil,this.pathFotoPerfil);
        this.imgServ.guardarImagen(this.segundaFoto,this.pathSegundaFoto);
      }else{
        this.imgServ.guardarImagen(this.fotoPerfil,this.pathFotoPerfil);
        this.nuevoUsuario.habilitado = false;
      }
      //console.log(this.nuevoUsuario);
      this.nuevoUsuario.estado = true;      
      this.usuarioServ.guardarUsuario(this.nuevoUsuario);
      this.formRegistro.reset();
      this.auth.authSuccess('Registro exitoso! No olvide verificar su email.');
    } catch (error : any) {
      //console.log(error);
      this.auth.thrownErrorsRegister(error.code);
    }
   
  }

  eligeTipoUsuario(){
    //console.log(this.tipoUsuario);
    if(this.tipoUsuario == 'paciente'){
      this.formRegistro.get('obraSocial')?.setValidators([Validators.required,Validators.minLength(3)]);
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.setValidators([Validators.required]);
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();

      //faltaria la 2da imagen
    }else if(this.tipoUsuario == 'medico'){
      //console.log(this.tipoUsuario);
      
      this.formRegistro.get('especialidad')?.setValidators([Validators.required]);
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('obraSocial')?.clearValidators();
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.clearValidators();
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();
    }
    else if(this.tipoUsuario == 'admin'){
      //console.log(this.tipoUsuario);
      
      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('obraSocial')?.clearValidators();
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.clearValidators();
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();
    }
    
  }

  guardarImagen(event:any){
    if(event.target.name == 'fotoPerfil'){
      const filePerfil : File = event.target.files[0];
      this.fotoPerfil = filePerfil;      
      this.pathFotoPerfil = event.target.files[0].name;
      //console.log(this.pathFotoPerfil);
        
    }
    else if(event.target.name == 'fotoDos'){
      const fileDos : File = event.target.files[0];
      this.segundaFoto = fileDos;      
      this.pathSegundaFoto = event.target.files[0].name;  
      //console.log(this.pathSegundaFoto);
    }
  }

  cargarUsuario(usuario:string){
    this.tipoUsuario = usuario;
    this.eligeTipoUsuario();    
  }

  cambiarUsuario(){
    //this.esPersona = false;
    this.tipoUsuario = '' ;
    this.formRegistro.reset();
  }

  agregarEspecialidad(checkbox:any){
    //me llega el checkbox, obtengo el value y si esta checkeado o no
    
    let espec = checkbox.source.value;
    let agregar = checkbox.checked
    
    if(agregar){      
      this.especialidades.push(espec)
    }else{
      this.especialidades = this.especialidades.filter(espe => espe != espec);
    }    
    this.formRegistro.controls.especialidad.patchValue(this.especialidades)
  }


  captchaValido(ok:boolean){
    this.esPersona = ok;
    this.formRegistro.controls.captcha.patchValue(ok);
  }


}
