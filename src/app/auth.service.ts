import { Injectable } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface NewUser {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser | any> = new Subject<
    CognitoUser | any
  >();
  authState: Observable<CognitoUser | any> = this._authState.asObservable();
  loggedInUser: any;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';

  constructor() {
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(this.toUsername(username), password)
        .then((user: CognitoUser | any) => {
          // this.loggedIn = true;
          // this.loggedInUser = JSON.stringify(user);
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // localStorage.setItem('token', user.signInUserSession.idToken.jwtToken);
          // localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          resolve(user);
        })
        .catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.userSubject.next(null);
    return Auth.signOut().then(() => (this.loggedIn = false));
  }

  // Sorry for this - the auth service I am testing against doesn't use @ in the username!
  toUsername(email) {
    return email.replace('@', '-at-');
  }

}