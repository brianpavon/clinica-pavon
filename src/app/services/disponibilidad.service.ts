import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Disponibilidad } from '../interfaces/disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  itemsCollection !: AngularFirestoreCollection<Disponibilidad>;
  todasDisponibilidades !: Observable<Disponibilidad[]>;

  constructor(private firestore : AngularFirestore) {

  }

  guardarDisponibilidad(nuevaDispo : Disponibilidad){
    this.firestore.collection('disponibilidad').add(nuevaDispo);
  }

  traerDisponibilidades(){
    this.itemsCollection = this.firestore.collection<Disponibilidad>('disponibilidad');
    return this.todasDisponibilidades = this.itemsCollection.valueChanges();
  }
}
