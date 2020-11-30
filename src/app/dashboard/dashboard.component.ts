import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Auth } from '@aws-amplify/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    Auth.currentSession()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  signOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }

}
