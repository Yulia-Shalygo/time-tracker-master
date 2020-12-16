import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header-calend',
  templateUrl: './header-calend.component.html',
  styleUrls: ['./header-calend.component.css']
})
export class HeaderCalendComponent implements OnInit {

  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.firebaseService.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
