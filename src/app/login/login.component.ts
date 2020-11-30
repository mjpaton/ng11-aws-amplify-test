import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  hide = true;
  error: string = null;

  get emailInput() { return this.signinForm.get('email'); }
  get passwordInput() { return this.signinForm.get('password'); }

  constructor(public auth: AuthService, private _router: Router) { }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  signIn() {
    console.log('signIn called!');
    this.auth.signIn(this.emailInput.value, this.passwordInput.value)
      .then((user: CognitoUser | any) => {
        console.log('Outputting user information from login.component.ts');
        console.log(user);
        console.log('Redirecting you to Dashboard page...');
        this._router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        console.log(error);
        this.error = error.message;
        switch (error.code) {
          case "UserNotConfirmedException":
            console.log('User has not confirmed error case.');
            this._router.navigate(['/login']);
            break;
          case "UsernameExistsException":
            console.log('Username already exists error case.');
            this._router.navigate(['/login']);
            break;
        }
      })
  }

}
