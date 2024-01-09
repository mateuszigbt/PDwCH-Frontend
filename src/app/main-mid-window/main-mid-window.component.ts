// main-mid-window.component.ts

import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Quiz } from '../domain/quiz';
import { DataService } from '../data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-mid-window',
  templateUrl: './main-mid-window.component.html',
  styleUrls: ['./main-mid-window.component.scss'],
  providers: [MessageService]
})
export class MainMidWindowComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private messageService: MessageService) {}

  allQuizzes: Quiz[] = [];
  quizzesPage: Quiz[] = [];
  first: number = 0; // Zaczynamy od pierwszej strony
  rows: number = 9; // Wyświetlamy 9 quizów na stronie
  allRecords!: number;
  whatIdUser!: number;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.loadQuizzes();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first !== undefined ? event.first : 0;
    this.updateQuizzesPage();
  }

  private loadQuizzes() {
    this.dataService.getAllQuizes().subscribe((response) => {
      this.allQuizzes = response;
      this.updateQuizzesPage();
    });
  }

  private updateQuizzesPage() {
    const endIndex = this.first + this.rows;
    this.quizzesPage = this.allQuizzes.slice(this.first, endIndex);
    this.allRecords = this.allQuizzes.length;
  }

  getSafeImageUrl(base64Image: string): SafeUrl {
    const imageUrl = `data:image/png;base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  choosenQuiz(item: Quiz) {
    let idUser = this.dataService.getSharedIdUser();
    if (idUser > 0) {
    let idQuiz = item.quizId;
    let title = item.title;
    let category = item.category.nameCategory;
    let rating = item.rating;
    this.dataService.setSharedIdChoosenQuiz(idQuiz!);
    this.dataService.setSharedTitleQuiz(title);
    this.dataService.setSharedCategoryQuiz(category);
    this.dataService.setSharedRatingQuiz(rating);
    this.dataService.setSharedData('resolve-quiz');
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail:
          'First, log in!',
      });
    }
  }

  goToTop(): void {
    window.scrollTo(0, 0);
  }

}
