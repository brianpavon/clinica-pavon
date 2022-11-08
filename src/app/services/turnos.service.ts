import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Turnos } from '../interfaces/turnos';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  itemsCollection !: AngularFirestoreCollection<Turnos>;
  todosLosTurnos !: Observable<Turnos[]>;
  constructor(private firestore : AngularFirestore) { }


  guardarTurno(turnoNuevo : Turnos){
    //this.firestore.collection('turnos').add(turnoNuevo);
    //console.log(turnoNuevo.id.toString());
    this.firestore.collection('turnos').doc(turnoNuevo.id.toString()).set(turnoNuevo,{merge:true});
  }

  traerTurnos(){
    this.itemsCollection = this.firestore.collection<Turnos>('turnos');
    return this.todosLosTurnos = this.itemsCollection.valueChanges();
  }

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
        //console.log(h);
        let ampm = h > 11 ? 'pm' : 'am'
        result.push(h + ':' + m + ampm);
      }
    }
    result.pop();
    result.pop();
    return result;
  }

  obtenerFechasDelRango(startDate:Date, endDate:Date){
    
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  public async devolverTurnoDB(id:string | undefined){
    return this.firestore
      .collection<Turnos>('turnos').doc(id)
      .valueChanges()
      .pipe(
        tap((data) => data),
        first()
      )
      .toPromise();
  }

  actualizarTurno(atributo: any, id: string){
    this.firestore.collection('turnos').doc(id).set(atributo,{merge:true});
  }
}
