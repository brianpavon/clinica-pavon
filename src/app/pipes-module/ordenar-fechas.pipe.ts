import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarFechas'
})
export class OrdenarFechasPipe implements PipeTransform {

  transform(value: any[], tipo: string): any[] {
    //return
    //console.log(tipo);
    let arrayOrdenado = [];
    switch (tipo) {
      case 'log':
        arrayOrdenado = value.sort((a,b)=>{
            console.log(b.fecha);
            
            return Date.parse(b.fecha) - Date.parse(a.fecha)
          });        
        break;
      case 'turnos':
        value.forEach(turno => {
          turno.fecha = this.formatearFecha(turno.fecha);
        });
        arrayOrdenado = value.sort((a,b)=>{
          return Date.parse(b.fecha) - Date.parse(a.fecha)
        }); 
        arrayOrdenado = arrayOrdenado.sort((a,b)=>{
          return b.estado.localeCompare(a.estado)
        })
      break;
    }
    
    return arrayOrdenado;
  }

  formatearFecha(fecha :string){
    let anio = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    let fechaParseada = new Date(anio+'/'+mes+'/'+dia);
    return fechaParseada;
  }

}
