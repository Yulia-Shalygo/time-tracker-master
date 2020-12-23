import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  async signin(email:string, password:string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
       
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('user_id', JSON.stringify(res.user.uid))
       
        this.router.navigate(['/calendar'])
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);

        this.router.errorHandler(error);
      })
  }

  async register(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;

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
  
  logout() {
    this.fireAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  getIsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
}
