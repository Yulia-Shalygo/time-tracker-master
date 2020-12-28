import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public firebaseService: FirebaseService) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const login = JSON.parse(localStorage.getItem('login'));

      if (login !== true) {
        this.router.navigate(['login']);
      }
      return true;   
    }
}
