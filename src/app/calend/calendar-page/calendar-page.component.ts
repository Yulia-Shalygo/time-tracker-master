import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  popup: boolean;

  constructor(private dataService: DateService) { }

  ngOnInit(): void {
  }

}
