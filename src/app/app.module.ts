import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';

import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDHgLlhMq-ZRwj-5HDckorCJhJDBOKfk84",
      authDomain: "time-tracker-9eb9c.firebaseapp.com",
      projectId: "time-tracker-9eb9c",
      storageBucket: "time-tracker-9eb9c.appspot.com",
      messagingSenderId: "4227827929",
      appId: "1:4227827929:web:6ccabd0cdb6247aa5856c8",
      measurementId: "G-43L14YMZ0Q"
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
