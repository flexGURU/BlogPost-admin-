import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor( private storage: AngularFireStorage) { }

  uploadImg(selectedImg) {
    const filePath = `postImg/${Date.now()}`;


    this.storage.upload(filePath, selectedImg).then(()=> {
      
    })

  }
}
