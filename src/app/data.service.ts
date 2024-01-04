import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './domain/user';
import { Category } from './domain/category';
import { Quiz } from './domain/quiz';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = `https://localhost:7298/api/`;
  private sharedDataSubject = new Subject<any>();
  private sharedSignInSubject = new Subject<boolean>();
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private idUserSubject = new BehaviorSubject<number>(1); //pamietaj aby zmienic!
  private idChoosenQuizSubject = new BehaviorSubject<number>(0);
  private idTitleQuizSubject = new BehaviorSubject<string>('');
  private idCategoryQuizSubject = new BehaviorSubject<string>('');
  private idRatingQuizSubject = new BehaviorSubject<number>(0);
  sharedData$ = this.sharedDataSubject.asObservable();
  isSignIn$ = this.sharedSignInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  sharedIdUser$ = this.idUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSharedIdUser(value: number): void {
    setTimeout(() => {
      this.idUserSubject.next(value);
    }, 0);
  }

  getSharedIdUser(): number {
    return this.idUserSubject.value;
  }

  setSharedIdChoosenQuiz(value: number): void {
    this.idChoosenQuizSubject.next(value);
  }

  setSharedTitleQuiz(value: string): void {
    this.idTitleQuizSubject.next(value);
  }

  getSharedTitleQuiz(): string {
    return this.idTitleQuizSubject.value;
  }

  setSharedCategoryQuiz(value: string): void {
    this.idCategoryQuizSubject.next(value);
  }

  getSharedCategoryQuiz(): string {
    return this.idCategoryQuizSubject.value;
  }

  setSharedRatingQuiz(value: number): void {
    this.idRatingQuizSubject.next(value);
  }

  getSharedRatingQuiz(): number {
    return this.idRatingQuizSubject.value;
  }

  getSharedIdChoosenQuiz(): number {
    return this.idChoosenQuizSubject.value;
  }

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  setSignIn(isSignIn: boolean): void {
    this.sharedSignInSubject.next(isSignIn);
    if (!isSignIn) {
      this.setAdmin(false);
    }
  }

  setAdmin(value: boolean): void {
    setTimeout(() => {
      this.isAdminSubject.next(value);
    }, 0);
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users', user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'category');
  }

  getAllQuizes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + 'quiz');
  }

  getByIdQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}quiz/${id}`)
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${id}`);
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    //const headers = new HttpHeaders();
    //headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<Quiz>(this.apiUrl + 'quiz', quiz);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + 'category', category);
  }

  addPoints(user: any, id: number): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}users/${id}`, user);
  }
}
