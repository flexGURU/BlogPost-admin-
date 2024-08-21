import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map,  switchMap, Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore, 
    private toastr: ToastrService, private router: Router) { }

  uploadImg(selectedImg, postData, formStatus, id) {
    const filePath = `postImg/${Date.now()}`;

    this.storage.upload(filePath, selectedImg).then(()=> {

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;

        if(formStatus == 'Edit') {
          this.updateItem(id, postData)
        } else {
        this.saveData(postData);


        }
      
      })
     
    })

  }

  saveData(postData) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Data has been added sucessfully");
      this.router.navigate(['/posts']);

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

  fetchItemDetails(id){
     return this.afs.collection('posts').doc(id).valueChanges();

  }

  updateItem(id, postEditData){
    return this.afs.doc(`posts/${id}`).update(postEditData).then(() => {
      this.toastr.success("Data updated succesfully");
      this.router.navigate(['/posts']);
    })
  }

  deleteItem(postImgPath, id){
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id)
    })
  }

  deleteData(id){
    this.afs.doc(`posts/${id}`).delete();
    this.toastr.warning('Data deleted...!')

  }


  
}
