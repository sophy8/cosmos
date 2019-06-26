import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  array = [];
  private messageSource = new BehaviorSubject(this.array);
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
