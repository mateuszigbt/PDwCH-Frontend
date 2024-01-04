import { Category } from '../domain/category';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private dataService: DataService) {}

  categoryList: Category[] = [];

  ngOnInit(): void {
    this.dataService.getAllCategory().subscribe((response) => {
      this.categoryList = response;
    });
  }
}
