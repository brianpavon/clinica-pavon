import { Turnos } from "./turnos";

export interface HistoriaClinica {
    altura:number;
    peso:number;
    temperatura:number;
    presion:number;
    datosDinamicos :{ 
        [key: string ]: string
    },
    turno:string;
}
