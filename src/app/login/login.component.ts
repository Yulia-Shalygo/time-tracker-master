import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSignedIn = false;
  err = false;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, public firebaseServise: FirebaseService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password: new FormControl(null, 
        [Validators.minLength(6), Validators.required])
    })

    if(localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async signin(email:string, password:string) {
    this.loginForm.disable();

    await this.firebaseServise.signin(email, password)
      .catch(error => {      
        this.loginForm.reset();
        this.loginForm.enable();
        this.err = true;
      })
  }
}
