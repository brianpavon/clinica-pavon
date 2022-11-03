import { Usuarios } from "./usuarios"

export interface Disponibilidad {
    
    medico:Usuarios;
    especialidad:string;
    dias:Dia[];
}

export interface Dia {
    dia:string;    
    desde:string,
    hasta:string;
    cantTurnos:number;
    duracion:number
}

