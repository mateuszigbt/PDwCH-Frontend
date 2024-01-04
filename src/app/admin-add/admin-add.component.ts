import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Category } from '../domain/category';
import { Quiz } from '../domain/quiz';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
  providers: [MessageService],
})
export class AdminAddComponent implements OnInit {
  value: string = '';
  quizIsOn: boolean = false;
  categoryIsOn: boolean = false;
  buttonsIsOn: boolean = true;
  lengthGallery: number = 0;
  selectedRadio!: boolean;
  category: Category[] = [];
  selectedCategory!: string;
  categoryInput: Category = {nameCategory: ''};
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

  uploadedImages: string[] = [];
  constructor(private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.dataService.getAllCategory().subscribe((response) => {
      this.category = response;
    });
    this.uploadedImages.push('../../assets/images/example-quiz.jpg');
  }

  onFileSelected(event: any) {
    this.uploadedImages.pop();
    this.quiz.images.pop();
    const files = event.files;
    if (files && files.length > 0) {
      this.loadImages(files);
    }
    this.lengthGallery = files.length - 1;
    this.createCorrectObjectBoxes();
  }

  loadImages(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const czytnik = new FileReader();
      const file = files[i];
      this.uploadedImages.pop();
      czytnik.onload = (e) => {
        const imageBase64 = e.target?.result as string;
        this.uploadedImages.push(imageBase64);

        const imageIndex = this.uploadedImages.length - 1;
        this.quiz.images[imageIndex].choosenImage = imageBase64;
        this.quiz.images[imageIndex].contentType = file.type;
      };

      czytnik.readAsDataURL(file);
    }
  }

  prepareGalleriaImages(): any[] {
    return this.uploadedImages.map((image) => ({ source: image }));
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
    for (let i = 0; i < this.lengthGallery * 4; i++) {
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

  /*
  addQuiz(): void {
    let formData = new FormData();

    // Dodawanie danych do obiektu FormData
    formData.append('title', this.quiz.title);
    formData.append('description', this.quiz.description);
    formData.append('rating', this.quiz.rating.toString());
    formData.append('category', this.quiz.category.nameCategory);

    for (let i = 0; i < this.quiz.answers.length; i++) {
      formData.append(`answers[${i}].answerText`, this.quiz.answers[i].answerText);
      formData.append(`correctAnswers[${i}].correctAnswer`, this.quiz.correctAnswers[i].correctAnswer.toString());
    }
    for (let i = 0; i < this.quiz.questions.length; i++) {;
        formData.append(`questions[${i}].questionText`, this.quiz.questions[i].questionText);
        formData.append(`images[${i}].choosenImage`, this.quiz.images[i].choosenImage);
        formData.append(`images[${i}].contentType`, this.quiz.images[i].contentType);
        console.log(this.quiz.images[i].choosenImage)
    }

    for (const image of this.quiz.answers) {
      formData.append('answerText', 'sdaffsdafafdsfdsa');
    }

    console.log(formData); // Dodaj to do debugowania

  // Upewnij się, że dane zostały poprawnie umieszczone w FormData
    console.log(this.quiz);

    this.dataService.addQuiz(formData).subscribe(
      (element) => {
        console.log(element);
      },
      (error) => {
        console.error('Błąd podczas dodawania quizu:', error);

        if (error instanceof HttpErrorResponse) {
          console.error('Status błędu:', error.status);
          console.error('Treść błędu:', error.error);
        }
      }
    );
  }
*/

}
