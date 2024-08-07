import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostImageService } from '../../services/post-image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  postArray: Array<any>;

  constructor( private postService: PostImageService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
      console.log(this.postArray)
    })
  }

}
