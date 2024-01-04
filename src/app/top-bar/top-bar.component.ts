import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [MessageService],
})
export class TopBarComponent implements OnInit{

  constructor(private dataService: DataService, private messageService: MessageService) {}

  private subscription!: Subscription;

  isSignIn: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.subscription = this.dataService.isSignIn$.subscribe(response => {
      this.isSignIn = response;
      if (this.isSignIn) {
        this.isAdmin = this.dataService.isAdmin();
      }
    });
  }

  signOut(): void {
    this.isSignIn = false;
    this.dataService.setSignIn(this.isSignIn);
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'You have been sign out',
    });
  }

  sendNameOfComponent(value: string): void {
    this.dataService.setSharedData(value);
  }
}
