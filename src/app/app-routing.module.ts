import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarPageComponent } from './calend/calendar-page/calendar-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderCalendComponent } from './calend/header-calend/header-calend.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
    ]},

    { path: 'calendar',  component: CalendarPageComponent, canActivate: [AuthGuardService]}, // canActivate: [AuthGuardService]
    {path: 'logout', component: HeaderCalendComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
