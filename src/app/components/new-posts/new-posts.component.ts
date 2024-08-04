import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-new-posts',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,
    AngularEditorModule, HttpClientModule
  ],
  templateUrl: './new-posts.component.html',
  styleUrl: './new-posts.component.css'
})
export class NewPostsComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/image.jpg';
  selectedImg: any;
  categories: any;

  constructor(private catService: CategoriesService) {}

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
