import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../domain/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  user: User = {
    email: '',
    isAdmin: false,
    login: '',
    password: '',
  };
  reapetPass: string = '';
  listUsers!: User[];
  isExistingInDatabase: boolean = false;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((response) => {
      this.listUsers = response;
    });
  }

  registerUser() {
    this.dataService.getAllUsers().subscribe((response) => {
      this.listUsers = response;
      
    this.listUsers.forEach((element) => {
      if (
        element.email === this.user.email ||
        element.login === this.user.login
      ) {
        this.isExistingInDatabase = true;
        return;
      } else {
        this.isExistingInDatabase = false;
      }
    });
    if (this.isExistingInDatabase === false) {
      if (
        this.user.email !== '' &&
        this.user.login !== '' &&
        this.user.password !== '' &&
        this.user.email.length >= 4 &&
        this.user.login.length >= 4 &&
        this.user.password.length >= 4 &&
        this.user.password === this.reapetPass
      ) {
        this.dataService.registerUser(this.user).subscribe(
          (response) => {
            this.isExistingInDatabase = false;
            this.user.email = '';
            this.user.login = '';
            this.user.password = '';
            this.reapetPass = '';
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User successfully created',
            });
          },
          (error) => {
            this.isExistingInDatabase = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Server problem',
            });
          }
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail:
            'Empty field or password is not same as repeat password or data is to short. Minimum for all 4 length',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail:
          'This E-mail or Login is existing in database',
      });
    }
  });
  }
}
