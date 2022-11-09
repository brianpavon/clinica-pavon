import { Usuarios } from "./usuarios";

export interface Turnos {    
    medico:Usuarios | any;
    paciente:Usuarios | any;
    especialidad:string;
    estado:string;//aceptado,realizado,cancelado,rechazado,solicitado
    fecha:string;
    horario:string;    
    duracion:number;
    id:string;    
    comentario:string;
    calificacion:string;
    encuesta:string[];
}
