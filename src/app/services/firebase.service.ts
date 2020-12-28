import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn: boolean;

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  signin(email:string, password:string) {
    return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {

      return this.fireAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          this.isLoggedIn = true;

          localStorage.setItem('login', JSON.stringify(this.isLoggedIn));
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('user_id', JSON.stringify(res.user.uid))
        
          this.router.navigate(['/calendar'])
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, ": ", errorMessage);

          this.router.errorHandler(error);
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      })
  }

  async register(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('login', JSON.stringify(this.isLoggedIn));

        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('user_id', JSON.stringify(res.user.uid))

        this.router.navigate(['/calendar'])
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);

        this.router.errorHandler(error);
      })
  } 

  getIsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
}
