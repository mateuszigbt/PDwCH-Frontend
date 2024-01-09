import { Subscription } from 'rxjs';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../domain/profile';
import { User } from '../domain/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  idUser!: number;
  userInfo: User[] = [];
  isFull: boolean = false;
  user!: User;
  getPoints: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sharedIdUser$.subscribe((id) => {
      this.idUser = id;
    });

    if (this.idUser != null) {
      this.dataService.getByIdUser(this.idUser).subscribe(response => {
        this.user = response;
        this.user.quizProfile!.forEach(element => {
          if (Array.isArray(element.points) && element.points.length > 0) {
            this.getPoints.push(element.points[0].score);
          }
        });
        this.userInfo = [response];
        this.user.quizProfile!.forEach(element => {
          const length = element.title?.length;
          if (length! > 0) {
            this.isFull = true;
            return;
          }
        });
      });
    }
  }
  calculateTotalPoints(points: any[], quizIndex: number): number {
    if (points && points[quizIndex]) {
      return points[quizIndex].score;
    }
    return 0;
  }
}
