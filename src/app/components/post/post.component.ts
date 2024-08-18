import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostImageService } from '../../services/post-image.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, ReactiveFormsModule 
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postArray: Array<any> = [];
  categories: Array<any> = [];
  options: Array<string> = ['Vue', 'Python', 'Node'];
  myControl = new FormControl();
  filteredOptions: Observable<Array<any>>;

  constructor(private postService: PostImageService) {}

  private _filter(value: string): Array<any> {
    const filterValue = value.toLowerCase();
    return this.categories.filter(cat => 
      cat.data.category.category.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
      this.categories = val;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }
}
