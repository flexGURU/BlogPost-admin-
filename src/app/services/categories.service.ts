import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastrService: ToastrService) { }

  saveData(data) {
    this.afs.collection('categories').add(data).then(docRef => {
      this.toastrService.success('Category inserted Successfully!');
      console.log(docRef)
    })
    .catch(err => { console.log(err)})
    

    }

  }
