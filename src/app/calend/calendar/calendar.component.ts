import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { Day } from '../../interfaces/day';
import { Week  } from '../../interfaces/week';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
//import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();

  calendar: Week[];
  date: BehaviorSubject<moment.Moment>;

  modal: boolean = false; // for popup
  calendarForm: FormGroup;

  dateForPopup: moment.Moment;
//  public firebaseService: FirebaseService
  constructor(public dataService: DateService) { }

  ngOnInit(): void {
    this.date = this.dataService.date;
    this.dataService.date.subscribe(this.calend.bind(this));

    this.calendarForm = new FormGroup({
      hours: new FormControl(null,
        [Validators.required,  Validators.max(24), Validators.min(0)]),
      description: new FormControl(null,
        [Validators.required])
    })
  }
  

  calend(curDate: moment.Moment) {
    let calendar = [];

    const start = curDate.clone().startOf('month').startOf('week')
    const end = curDate.clone().endOf('month').endOf('week')
    const date = start.clone().subtract(0, 'day');
    
    while (date.isBefore(end, 'day')) {
      calendar.push({
          days: Array(7).fill(0).map(() =>  {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date') // curDate
            const selected = curDate.isSame(value, 'date')
            return { value, active, selected }
          })         
      })
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dataService.changeDate(day)
  }
  
  minusMonth(): void {
   this.dataService.minusMonth();
  }

  plusMonth(): void {
    this.dataService.plusMonth();
  }

  // for popup
  changeModal(day: moment.Moment):void {
    this.modal = true;
    this.dateForPopup = day; 
    console.log(this.dateForPopup);   
  }

  closeModal() {
    this.modal = false;
    this.calendarForm.reset();
  }

  logout() {
   // this.firebaseService.logout();
    this.isLogout.emit();
  }
}
