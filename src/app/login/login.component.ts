import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSignedIn = false;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, public fi: FirebaseService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password: new FormControl(null, 
        [Validators.minLength(6), Validators.required ])
    })

    // this.route.queryParams.subscribe((params: Params) => {
       
    // })

    if(localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async signin(email:string, password:string) {
    this.loginForm.disable();

    console.log("SIGNIN 1")
    await this.fi.signin(email, password)
      .then(res => {
        
      }).catch(error => {
        console.log("err")
        this.loginForm.enable();
      })
  }
  handleLogout() {
    this.isSignedIn = false;
    
  }

  onSubmit():void {

  }
}
