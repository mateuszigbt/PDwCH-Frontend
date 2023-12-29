import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `https://localhost:7298/api/`;
  private sharedDataSubject = new Subject<any>();
  private sharedSignInSubject = new Subject<boolean>();
  sharedData$ = this.sharedDataSubject.asObservable();
  isSignIn$ = this.sharedSignInSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  setSignIn(isSignIn: boolean) : void {
    this.sharedSignInSubject.next(isSignIn);
  }

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users', user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "users")
  }
}
