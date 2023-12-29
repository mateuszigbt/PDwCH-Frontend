import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 }))
]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeIn]
})

export class AppComponent implements OnInit {
  title = 'Quiz';

  getNameComponents: string = 'login';
  private subscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.dataService.sharedData$.subscribe(data => {
      this.getNameComponents = data;
    });
  }
}
