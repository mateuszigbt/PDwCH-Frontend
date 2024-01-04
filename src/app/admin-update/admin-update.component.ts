import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Quiz } from '../domain/quiz';
import { Category } from '../domain/category';
import { MessageService } from 'primeng/api';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 }))
]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss'],
  animations: [fadeIn],
  providers: [MessageService],
})
export class AdminUpdateComponent implements OnInit {
  value: string = '';
  quizIsOn: boolean = false;
  categoryIsOn: boolean = false;
  buttonsIsOn: boolean = true;
  lengthGallery: number = 0;
  selectedRadio!: boolean;
  category: Category[] = [];
  selectedCategory!: string;
  categoryInput: Category = {nameCategory: ''};
  listQuizes: Quiz[] = [];
  selectedQuiz: Quiz = {title: '', description: '', rating: 0, category: {'nameCategory': ''}, answers: [{answerText: ''}], correctAnswers: [{correctAnswer: false}], questions: [{questionText: ''}], images: [{choosenImage: '', contentType: ''}]}
  quiz: Quiz = {
    title: '',
    description: '',
    rating: 0,
    category: { nameCategory: '' },
    answers: [
      { answerText: '' },
      { answerText: '' },
      { answerText: '' },
      { answerText: '' },
    ],
    correctAnswers: [
      { correctAnswer: false },
      { correctAnswer: false },
      { correctAnswer: false },
      { correctAnswer: false },
    ],
    images: [
      { choosenImage: '', contentType: '' },
      { choosenImage: '', contentType: '' },
      { choosenImage: '', contentType: '' },
      { choosenImage: '', contentType: '' },
    ],
    questions: [{ questionText: '' }],
  };

  uploadedImages: string[] = [''];
  constructor(private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.dataService.getAllCategory().subscribe((response) => {
      this.category = response;
    });
    this.dataService.getAllQuizes().subscribe((response) => {
      this.listQuizes = response
    });

  }

  test(): void {
    this.uploadedImages = []
    this.dataService.getByIdQuiz(this.selectedQuiz.quizId!).subscribe((response) => {
      response.images.forEach(element => {
        this.uploadedImages.push(element.choosenImage)
      });
    });
  }

  toggleQuiz(): void {
    this.quizIsOn = true;
    this.buttonsIsOn = false;
  }

  toggleCategory(): void {
    this.categoryIsOn = true;
    this.buttonsIsOn = false;
  }

  createCorrectObjectBoxes(): void {
    for (let i = 0; i < this.uploadedImages.length * 4; i++) {
      this.quiz.answers.push({ answerText: '' });
      this.quiz.correctAnswers.push({ correctAnswer: false });
    }

    for (let i = 0; i < this.lengthGallery; i++) {
      this.quiz.questions.push({ questionText: '' });
      this.quiz.images.push({ choosenImage: '', contentType: '' });
    }
  }

  getRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  selectRadio(i: number, j: number): void {
    const startIndex =
      i * (this.quiz.correctAnswers.length / this.uploadedImages.length);
    const endIndex =
      startIndex + this.quiz.correctAnswers.length / this.uploadedImages.length;

    for (let index = startIndex; index < endIndex; index++) {
      this.quiz.correctAnswers[index].correctAnswer = false;
    }
    this.quiz.correctAnswers[startIndex + j].correctAnswer = true;
  }

  addQuiz(): void {
    this.quiz.images.pop();
    this.quiz.images.pop();
    this.quiz.images.forEach(image => {
      image.choosenImage = image.choosenImage.replace(/^data:image\/[a-z]+;base64,/, '');
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Quiz successfully created',
    });
    setTimeout(() => {
      this.dataService.addQuiz(this.quiz).subscribe((response) => {
        this.dataService.setSharedData('profile-admin');
      });
      }, 3000);
  }

  addCategory(): void {
    if (this.categoryInput.nameCategory != '' ) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category successfully created',
      });
      setTimeout(() => {
        this.dataService.addCategory(this.categoryInput).subscribe((response => {
          this.dataService.setSharedData('profile-admin');
        }));
        }, 3000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Fill input',
      });
    }
  }
}
