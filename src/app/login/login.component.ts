import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email, Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.min(6) ])
  });

  hide = true;
  error: string = null;

  get emailInput() { return this.signinForm.get('email'); }
  get passwordInput() { return this.signinForm.get('password'); }

  constructor(private _router: Router ) { }

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
    console.log('Redirecting you to Dashboard page...');
    this._router.navigate(['/dashboard']);
    // this.auth.signIn(this.emailInput.value, this.passwordInput.value)
    //   .then((user: CognitoUser|any) => {
    //     // console.log(user);
    //     this._router.navigate(['/events']);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     this.error = error.message;
    //     switch (error.code) {
    //       case "UserNotConfirmedException":
    //         environment.confirm.email = this.emailInput.value;
    //         environment.confirm.password = this.passwordInput.value;
    //         this._router.navigate(['auth/confirm']);
    //         break;
    //       case "UsernameExistsException":
    //         this._router.navigate(['auth/signin']);
    //         break;
    //     }
    //   })
  }

}
