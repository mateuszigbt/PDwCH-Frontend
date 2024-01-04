import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Quiz } from '../domain/quiz';
import { DataService } from './../data.service';
import { Category } from './../domain/category';
import { Component, OnInit } from '@angular/core';
import { Images } from '../domain/images';
import { MessageService } from 'primeng/api';
import { User } from '../domain/user';

@Component({
  selector: 'app-resolve-quiz',
  templateUrl: './resolve-quiz.component.html',
  styleUrls: ['./resolve-quiz.component.scss'],
  providers: [MessageService],
})
export class ResolveQuizComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private domSanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  choosenIdFromMain!: number;
  quiz!: Quiz;
  currentIndex: number = 0;
  currentIndex_2: number = 1;
  imageUrl: SafeUrl[] = [];
  words: string[] = ['A.', 'B.', 'C.', 'D.'];
  words_2: string[] = ['|A|', '|B|', '|C|', '|D|'];
  answersArray: string[] = [];
  correctAnswerArray: boolean[] = [];
  questionsArray: string[] = []
  indexForLoop: number = 2;
  lastIndex: number = 4;
  selectedCorrectAnswer: number | null = null;
  numberRadioArray: number[] = [0, 1, 2, 3];
  countPoints: number = 0;
  idUser!: number;
  title!: string;
  category!: string;
  rating!: number;
  user: User = { quizProfile: [{ points: {score: 0}}], login: '', password: '', email:'', isAdmin: true };

  ngOnInit(): void {
    this.choosenIdFromMain = this.dataService.getSharedIdChoosenQuiz();
    this.choosenIdFromMain = 8;
    this.title = this.dataService.getSharedTitleQuiz();
    this.category = this.dataService.getSharedCategoryQuiz();
    this.rating = this.dataService.getSharedRatingQuiz();
    this.dataService
      .getByIdQuiz(this.choosenIdFromMain)
      .subscribe((response) => {
        this.quiz = response;
        for (let i = 0; i < 4; i++) {
          this.answersArray[i] = this.quiz.answers[i].answerText;
          this.correctAnswerArray[i] =
            this.quiz.correctAnswers[i].correctAnswer;
        }
        for (let i = 0; i < this.quiz.images.length; i++) {
          this.questionsArray[i] = this.quiz.questions[i].questionText;
        }
        this.repairImages();
      });
    this.idUser = this.dataService.getSharedIdUser();
  }

  repairImages(): void {
    for (let i = 0; i < this.quiz.images.length; i++) {
      this.quiz.images[
        i
      ].choosenImage = `data:image/png;base64,${this.quiz.images[i].choosenImage}`;
      this.imageUrl[i] = this.domSanitizer.bypassSecurityTrustUrl(
        this.quiz.images[i].choosenImage
      );
    }
  }

  nextQuestions(): void {
    if (this.currentIndex_2 === this.quiz.images.length) {
      const requestPayload = {
        userDto: {},
        quizProfile: [
          {
            title: this.title,
            category: this.category,
            rating: this.rating,
            points: [
              {
                score: this.countPoints
              }
            ]
          }
        ]
      };
      this.dataService.addPoints(requestPayload, this.idUser).subscribe(response => {
        this.dataService.setSharedData('main');
      });
    }
    if (this.selectedCorrectAnswer != null && this.currentIndex < this.quiz.images.length) {
      this.currentIndex++;
      this.currentIndex_2++;
      this.answersArray = [];
      this.correctAnswerArray = [];
      console.log(this.indexForLoop)
      for (let i = this.lastIndex; i < this.indexForLoop * 4; i++) {
        this.answersArray.push(this.quiz.answers[i].answerText);
        this.correctAnswerArray.push(this.quiz.correctAnswers[i].correctAnswer);
      }
      this.lastIndex = this.indexForLoop * 4;
      this.indexForLoop = this.currentIndex_2 + 1;
      let indexFromRadio = this.selectedCorrectAnswer;
      if (this.correctAnswerArray[indexFromRadio!] === true) {
        this.countPoints++;
      }
      this.selectedCorrectAnswer = null;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Choose answer!',
      });
    }
  }
}
