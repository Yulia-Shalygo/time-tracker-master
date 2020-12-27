import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date.service';
import { Week  } from '../../interfaces/week';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  userUID = localStorage.getItem('user_id').replace("\"", "").replace("\"", "");

  calendar: Week[];

  modal: boolean = false; // for popup
  calendarForm: FormGroup;

  arr: Task[] = [];
  finTask: Task[] = [];
  tempArr;

  tempTask: Task = {
    description: '',
    time: '',
    date: '',
    user: ''
  }

  constructor(public dataService: DateService, public taskService: TaskService) { }

  ngOnInit(): void {
    this.dataService.date.subscribe(this.calend.bind(this));
    this.calendarForm = new FormGroup({
      hours: new FormControl(null,
        [Validators.required,  Validators.max(24), Validators.min(0)]),
      description: new FormControl(null,
        [Validators.required])
    })
    this.finTask = this.taskService.readAll()
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

            const disable = !curDate.isSame(value, 'month');
            return { value, active, selected, disable }
          })         
      })
    }
    this.calendar = calendar;
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
    this.dataService.changeDate(day);

    this.readTaskForModal();
  }

  closeModal() {
    this.modal = false;
    this.calendarForm.reset();
  }

  logout() {
    this.isLogout.emit();
  }

  submit() {
    const {description} = this.calendarForm.value;
    const {hours} = this.calendarForm.value; 

    const task: Task = {
      date: this.dataService.date.value.format('YYYY-MM-DD'),
      description,
      time: hours,
      user: this.userUID
    }
    this.taskService.create(task)
    this.calendarForm.reset();
    this.modal = false;
  }

  readTaskForModal(): void {
    this.tempArr = this.finTask.filter(item => item.user == this.userUID).filter(item => item.date == this.dataService.date.value.format("YYYY-MM-DD"))
    if (this.tempArr.length) {
      this.tempArr.map((item) => {
      this.tempTask.description = item.description;
      this.tempTask.time = item.time
      this.tempTask.date = item.date
      this.tempTask.user = item.user
      }) 
    } else {
      this.tempTask.description = '';
      this.tempTask.time = '';
      this.tempTask.date = '';
      this.tempTask.user = '';
    }
  }
}
