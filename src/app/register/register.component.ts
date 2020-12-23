import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  isSignedIn = false;
  err = false;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password1: new FormControl(null, 
        [Validators.minLength(6), Validators.required ]),
      password2: new FormControl(null, 
        [Validators.minLength(6), Validators.required ])
    })
  }

  onSubmit(): void {
    console.log(this.formRegister.value);
  }

  async onSignup(email:string, password:string) {
    await this.firebaseService.register(email, password).catch(error => {      
      this.formRegister.reset();
      this.formRegister.enable();
      this.err = true;
    })

    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
    }
  }
}
