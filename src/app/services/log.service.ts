import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Logs } from '../interfaces/logs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  itemsCollection !: AngularFirestoreCollection<Logs>
  todosLosLogs !: Observable<Logs[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarLog(nuevoLog:Logs){
    this.firestore.collection('logs').add(nuevoLog);
  }
}
