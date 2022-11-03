import { Usuarios } from "./usuarios";

export interface Turnos {    
    medico:Usuarios | any;
    paciente:Usuarios | any;
    especialidad:string;
    estado:string;//aceptado,finalizado,cancelado,rechazado,solicitado
    fecha:string;
    horario:string;    
    duracion:number;
    id:string
}
