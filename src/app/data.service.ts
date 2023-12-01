import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedDataSubject = new Subject<any>();
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }
}
