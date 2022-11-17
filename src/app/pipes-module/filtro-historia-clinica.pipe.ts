import { Pipe, PipeTransform } from '@angular/core';
import { HistoriaClinica } from '../interfaces/historia-clinica';
import { Turnos } from '../interfaces/turnos';

@Pipe({
  name: 'filtroHistoriaClinica'
})
export class FiltroHistoriaClinicaPipe implements PipeTransform {

  transform(turnos: Turnos[], filterText: string): Turnos[]{
    let turnosFiltrados:Turnos[] = [];
    
    if(turnos.length === 0 || filterText ===''){
      return turnos;
    }
    else{

      turnos.forEach(t =>{

        if(t.historiaClinica){

          for (const key in t.historiaClinica) {            
            if(t.historiaClinica[key as keyof HistoriaClinica].toString().toLowerCase().includes(filterText.toLowerCase()) || key.toLowerCase().includes(filterText)){
              turnosFiltrados.push(t);
            }
            if(key == 'datosDinamicos'){

              for (const clave in t.historiaClinica[key]) {
                
                if(t.historiaClinica[key][clave]){
                  if(t.historiaClinica[key][clave].toString().toLowerCase().includes(filterText.toLowerCase()) || clave.toLowerCase().includes(filterText)){
                    turnosFiltrados.push(t);
                  }                   
                }
              }
            }
          }

        }
       
      })
      return turnosFiltrados;
    }
  
  }

}
