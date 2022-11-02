import { Usuarios } from "./usuarios"

export interface Disponibilidad {
    
        medico:Usuarios;
        especialidad:string;
        dias:Dia[];       
        // dias:{
        //     lunes:{
        //         duracion:number,
        //         cantidadDeTurnos:number,
        //         desde:string,
        //         hasta:string
        //     }
        // }
}

export interface Dia {
    dia:string;    
    desde:string,
    hasta:string;
    cantTurnos:number
}

