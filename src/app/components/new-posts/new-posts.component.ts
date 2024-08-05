import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';




@Component({
  selector: 'app-new-posts',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,
    AngularEditorModule, HttpClientModule,  ReactiveFormsModule
  ],
  templateUrl: './new-posts.component.html',
  styleUrl: './new-posts.component.css'
})
export class NewPostsComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/image.jpg';
  selectedImg: any;
  categories: any;
  postForm: FormGroup;

  constructor(private catService: CategoriesService, private fb: FormBuilder) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    })

  }

  get fc() {
    return this.postForm.controls;
  }

  

  ngOnInit(): void {
    this.catService.loadData().subscribe(val => {

      this.categories = val;
    })
  }

  onTitleChange($event) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
    
  }

  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];

  }

}
