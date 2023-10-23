import { PageEvent } from '@angular/material/paginator';
import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-main-mid-window',
  templateUrl: './main-mid-window.component.html',
  styleUrls: ['./main-mid-window.component.scss']
})
export class MainMidWindowComponent {

  first: number = 0;
  rows: number = 10;

  onPageChange(event: PaginatorState) {
    event.rows = 0;
    event.first = 10;
  }
}
