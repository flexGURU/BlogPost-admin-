import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Post } from '../../models/post';
import { PostImageService } from '../../services/post-image.service';




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
  queryParam: any;

  constructor(
    private catService: CategoriesService, 
    private fb: FormBuilder,
    private uploadImg: PostImageService, 
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(val => {
      this.uploadImg.fetchItemDetails(val['id']).subscribe(post => {
        console.log(post)
      })
      
    });

   

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });

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

  onSubmit() {

    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryid: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }

    this.uploadImg.uploadImg(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = './assets/image.jpg'
  }

 


}
