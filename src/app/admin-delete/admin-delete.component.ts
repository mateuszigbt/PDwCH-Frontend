import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.scss']
})
export class AdminDeleteComponent {

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
    { name: 'Answer NO. 1', code: 't' },
    { name: 'Answer NO. 2', code: 'g' },
    { name: 'Answer NO. 3', code: 't' },
    { name: 'Answer NO. 4', code: 'g' },
    { name: 'Answer NO. 5', code: 't' },
    { name: 'Answer NO. 6', code: 't' },
  ];

  value: string = '';
  selectedCity: string = '';
}
