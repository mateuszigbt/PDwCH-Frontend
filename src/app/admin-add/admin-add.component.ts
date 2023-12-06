import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent {
  images: any[] = [
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Description for Image 2',
      title: 'Title 2',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  cities: any[] = [
    { name: 'test', code: 't' },
    { name: 'egeg', code: 'g' },
  ];

  selectedCity: any;
  quizIsOn: boolean = false;
  buttonsIsOn: boolean = true;
  toggleCategory(): void {
    this.quizIsOn = true;
    this.buttonsIsOn = false;
  }
}
