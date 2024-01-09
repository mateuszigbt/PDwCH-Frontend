import { Component, OnInit } from '@angular/core';
import { Profile } from '../domain/profile';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { User } from '../domain/user';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss'],
})
export class ProfileAdminComponent implements OnInit {
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

        // Zainicjuj tablicę getPoints tutaj
        this.getPoints = this.user.quizProfile!.map(element => {
          if (Array.isArray(element.points) && element.points.length > 0) {
            return element.points[0].score;
          }
          return 0;
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

  toCreate(): void {
    this.dataService.setSharedData('admin-add');
  }

  toEdit(): void {
    this.dataService.setSharedData('admin-edit');
  }

  toDelete(): void {
    this.dataService.setSharedData('admin-delete');
  }

}
