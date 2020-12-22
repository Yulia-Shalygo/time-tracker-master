import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MomentPipe } from 'src/app/services/moment.pipe';
import { CalendarPageComponent } from '../calendar-page/calendar-page.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { HeaderCalendComponent } from '../header-calend/header-calend.component';


const routes: Routes = [{ path: '', component: CalendarPageComponent }];

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
   
  ],
  exports: [RouterModule]
})
export class CalendarPageMRoutingModule { }
