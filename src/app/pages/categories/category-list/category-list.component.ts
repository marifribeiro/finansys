import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService} from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => console.log(error)
    )
  }

  deleteCategory(category) {
    const mustDelete = confirm(`Deseja excluir a categoria ${category.name}?`);

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => {
          this.categories = this.categories.filter(el => el !== category)
        },
        error => {
          console.log(`Erro ao excluir => ${error}`);
        }
      )
    }
  }

}
