export interface Usuarios {
    id:number;
    rol:string;
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    email:string;
    clave:string;    
    especialidad?:string;
    obraSocial?:string;
    fotoPerfil:string;
    fotoDos?:string;
    estado:boolean;
    habilitado?:boolean
}
