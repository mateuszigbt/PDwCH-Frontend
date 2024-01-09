import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { DataService } from './../data.service';
import { Quiz } from './../domain/quiz';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
  providers: [MessageService]
})
export class RandomComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private messageService: MessageService) {}

  quiz: Quiz[] = [];
  oneQuiz!: Quiz;

  ngOnInit(): void {
    this.dataService.getAllQuizes().subscribe((response) => {
      this.quiz = response;
      this.randomQuiz();
    });
  }

  randomQuiz(): void {
    if (this.quiz && this.quiz.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quiz.length);
      this.oneQuiz = this.quiz[randomIndex];
    }
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

}
