import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastrService: ToastrService,
    private db: AngularFireDatabase
  ) { }

  saveData(data) {
    this.afs.collection('categories').add(data).then(docRef => {
      this.toastrService.success('Category inserted Successfully!');
      console.log(docRef)
    })
    .catch(err => { console.log(err)})
    

    }

   loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe (
      map(actions => {
        return actions.map (a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
   }

   updateData(id, editData) {

    this.afs.collection('categories').doc(id).update(editData).then(docRef => {
      this.toastrService.success('Data updated Successfully!');
      
    })

   }

   deleteData(id) {
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      this.toastrService.success('Data deleted Successfully!');

    })
   }
   

   


  }
