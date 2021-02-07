import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  counter = 1;
  count: BehaviorSubject<number>;
  
  constructor() {
    this.count = new BehaviorSubject(this.counter);
  }

  nextCount(newUserType: number) {
    this.count.next(newUserType);
  }
  resetCount() {
    this.count.next(this.counter = 1);
  }
}
