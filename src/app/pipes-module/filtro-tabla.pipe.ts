import { Pipe, PipeTransform } from '@angular/core';
import { Turnos } from '../interfaces/turnos';

@Pipe({
  name: 'filtroTabla'
})
export class FiltroTablaPipe implements PipeTransform {

  transform(turnosEnviados : Turnos[], filterValue : string,tabla:string): Turnos[] {
    let turnosFiltrados : Turnos[] = []
    if(turnosEnviados.length == 0 || filterValue == ''){
      return turnosEnviados;
    }else{
      
      turnosEnviados.forEach(
        t=>{
          if(t.especialidad.toLowerCase().includes(filterValue)){
            //console.log('entro');            
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(`${t.medico.nombre} ${t.medico.apellido}`.toLowerCase().includes(filterValue) && tabla != 'medicos'){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(`${t.paciente.nombre} ${t.paciente.apellido}`.toLowerCase().includes(filterValue) && tabla != 'pacientes'){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.fecha.toString().toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.estado.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.horario.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
        }
      )
      
      return turnosFiltrados;
    }

  }

}
