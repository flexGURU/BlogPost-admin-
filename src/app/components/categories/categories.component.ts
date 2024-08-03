import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categoryArray: Array<any>;
  formCategory: string;
  formStatus: string = 'Add';
  categoryId: string

  constructor(private catService: CategoriesService) {}

  ngOnInit(): void {
    this.catService.loadData().subscribe( val => {
      // console.log(val);
      this.categoryArray =  val
      
    }
     
    );
  }

  onSubmit(formData) {
    let categoryData: Category = {
      category:  formData.value.category,
    }
    if( this.formStatus == 'Add' ) {
      this.catService.saveData(categoryData);
      formData.reset();
  }
  else if ( this.formStatus == 'Edit' ) {
    this.catService.updateData(this.categoryId, categoryData);
    formData.reset();
  }

     
  }

  onEdit(category, id) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
    this.formStatus = 'Add'
  }

  onDelete(id) {
    this.catService.deleteData(id)
  }





}
