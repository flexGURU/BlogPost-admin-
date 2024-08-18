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


  
}
