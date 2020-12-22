import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarPageMRoutingModule } from './calendar-page-m-routing.module';
import { CalendarPageMComponent } from './calendar-page-m.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { MomentPipe } from 'src/app/services/moment.pipe';
import { HeaderCalendComponent } from '../header-calend/header-calend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarPageComponent } from '../calendar-page/calendar-page.component';


@NgModule({
  declarations: [
    CalendarPageMComponent,
    CalendarComponent,
    CalendarPageComponent,
    MomentPipe,
    HeaderCalendComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarPageMRoutingModule
  ]
})
export class CalendarPageMModule { }