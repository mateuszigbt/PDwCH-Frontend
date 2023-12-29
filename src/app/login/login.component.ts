import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  user: User = {
    email: '',
    isAdmin: false,
    login: '',
    password: '',
  };
  userList!: User[];
  isFound: boolean = false;
  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((response) => {
      this.userList = response;
    });
  }

  loginUser(): void {
    this.userList.forEach((element) => {
      if (
        this.user.login === element.login &&
        this.user.password === element.password
      ) {
        this.isFound = true;
        return;
      }
    });

    if (this.isFound === true) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Welcome on Quiz',
      });
      setTimeout(() => {
      this.dataService.setSharedData('main');
      this.dataService.setSignIn(true);
      }, 3000);

      this.isFound = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bad login or password',
      });
    }
  }
}
