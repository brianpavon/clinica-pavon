import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  url!:Observable<string | null>
  constructor(private storage:AngularFireStorage) { }

  guardarImagen(archivo:File,path:string){
    const task = this.storage.upload(path, archivo);
  }

  descargarImagen(urlImg:any){
    const ref = this.storage.ref(urlImg);
    return this.url = ref.getDownloadURL();
  }
}
