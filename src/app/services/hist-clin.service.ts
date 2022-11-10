import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../interfaces/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistClinService {

  itemsCollection !: AngularFirestoreCollection<HistoriaClinica>;
  todasLasHistClin !: Observable<HistoriaClinica[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarHistClin(nuevaEspec : HistoriaClinica){
    this.firestore.collection('especialidades').add(nuevaEspec);
  }

  traerTodasLasHistClinicas(){
    this.itemsCollection = this.firestore.collection<HistoriaClinica>('historiaClinica');
    return this.todasLasHistClin = this.itemsCollection.valueChanges();
  }
}
