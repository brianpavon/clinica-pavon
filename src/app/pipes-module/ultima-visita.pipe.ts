import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ultimaVisita'
})
export class UltimaVisitaPipe implements PipeTransform {

  transform(turnos: any[]): number {
    let arrayFechas : string[] = []
    let diasSinRedondear : number;
    let totalDias : number
    //el equivalente a milisegundos
    let unDia = 1000 * 60 * 60 * 24;
    //obtengo el dia de hoy y lo parse a milisegundos para obtener un numero
    let hoy = new Date();
    let hoyParseado = Date.parse(`${hoy.getFullYear()}/${hoy.getMonth()+1}/${hoy.getDate()}`)
    //voy a guardar el ultimo dia que se atendio
    let fechaUltima;

    //formateo las fechas para que pueda hacer el date.parse
    turnos.forEach(turno => {
      arrayFechas.push(this.formatearFecha(turno.fecha));
    });
    
    //ordeno
    arrayFechas = arrayFechas.sort((a,b)=>{
      return Date.parse(b) - Date.parse(a);
    })
    //en esta posición siempre va a quedar el ultimo turno, es decir la ultima fecha
    fechaUltima = Date.parse(arrayFechas[0]);
    //resto milisegundo y divido por los milisegundos de un dia
    diasSinRedondear = Math.round(hoyParseado-fechaUltima)/(unDia)
    //saco decimales por las dudas
    totalDias = parseInt(diasSinRedondear.toFixed(0));

    return totalDias <=0 ? 0 : totalDias;
  }

  formatearFecha(fecha :string){
    let anio = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    return anio+'/'+mes+'/'+dia;
  }

}
