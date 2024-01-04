import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { DataService } from './../data.service';
import { Quiz } from './../domain/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

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
    console.log(item.quizId, item.title, item.description);
  }

}
