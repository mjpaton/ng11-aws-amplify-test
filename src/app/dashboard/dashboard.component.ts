import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: CognitoUser;
  currentDate = new Date();

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);
    console.log('Outputting user information from dashboard.component.ts');
    console.log(this.user);
  }

  signOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }

}
