import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Especialidades } from '../interfaces/especialidades';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  itemsCollection !: AngularFirestoreCollection<Especialidades>;
  todasLasEspecialidades !: Observable<Especialidades[]>;
  
  constructor(private firestore : AngularFirestore) {

  }

  guardarEspecialidad(nuevaEspec : Especialidades){
    this.firestore.collection('especialidades').add(nuevaEspec);
  }

  traerTodasLasEspecialidades(){
    this.itemsCollection = this.firestore.collection<Especialidades>('especialidades');
    return this.todasLasEspecialidades = this.itemsCollection.valueChanges();
  }
}
