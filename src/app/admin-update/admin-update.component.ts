import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [fadeIn]
})
export class AdminUpdateComponent {

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
