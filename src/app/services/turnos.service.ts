import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor() { }

  definirTurnos(n:any,desde:any,hasta:any){
    let result = [];
    for(let hours = desde; hours <= hasta; hours++){
      for(let minutes = 0; minutes < 60; minutes = minutes+n){
        let h:any = '';
        let m:any = '';
        if(hours<10){
          h = '0' + hours;
        }else{
          h = hours;
        }
        if(minutes<10){
          m = '0' + minutes;
        }else{
          m = minutes;
        }
        result.push(h + ':' + m);
      }
    }
    result.pop();
    result.pop();
    return result;
  }
}
