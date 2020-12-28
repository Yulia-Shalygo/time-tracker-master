import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderCalendComponent } from './calend/header-calend/header-calend.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
    ]},
    { path: 'calendar', canActivate: [AuthGuardService], loadChildren: () => import('./calend/calendar-page-m/calendar-page-m.module').then(m => m.CalendarPageMModule) },
    {path: 'logout', component: HeaderCalendComponent},
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
