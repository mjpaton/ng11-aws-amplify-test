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
    // this.authService.user.subscribe(user => this.user = user);
    // console.log('Outputting user information from dashboard.component.ts');
    // console.log(this.user);

    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('Outputting currentAuthenticatedUser results:');
        console.log(user);
      })
      .catch(() => console.log("No user signed in?"));
  }

  signOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }

}
