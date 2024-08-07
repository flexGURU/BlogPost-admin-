import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService) { }

  uploadImg(selectedImg, postData) {
    const filePath = `postImg/${Date.now()}`;

    this.storage.upload(filePath, selectedImg).then(()=> {

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        this.saveData(postData);
      
      })
     
    })

  }

  saveData(postData) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Data has been added sucessfully")

    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {

        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })

      })
    )
  }

}
