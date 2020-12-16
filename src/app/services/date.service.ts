import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  //curDate = moment().format('MMMM YYYY ')

 public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  
  constructor() {
   }

  // getCurrentDate(): moment.Moment {
  //   return moment();//.format('MMMM YYYY');
  // }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    })
    this.date.next(value)
  }
  getDate(): moment.Moment {
    return this.date.value;
  }
  minusMonth(): void {
    const value = this.date.value.add(-1, 'month');
    this.date.next(value);
  }
  plusMonth(): void {
    const value =  this.date.value.add(1, 'month');
    this.date.next(value);
  }
}
