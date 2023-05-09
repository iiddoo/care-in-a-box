import { Component } from '@angular/core';
import { UserService } from '@nx-workspace/shared/data-access-user';
@Component({
  selector: 'nx-workspace-login-entry',
  template: `
    <div class="login-app">
    <form class="login-form" (ngSubmit)="login()">
    <h1>Login</h1>
    <div class="content">
    <div class="input-field">
    <input type="text" name="username" placeholder="Username" autocomplete="nope" [(ngModel)]="username" />
    </div>
    <div class="input-field">
    <input type="password" name="password" placeholder="Password" autocomplete="new-password" [(ngModel)]="password" />
    </div>
    <div *ngIf="isLoggedIn$ | async" class="link">User is logged in!</div>
    </div>
    <div class="action">
    <button type="submit">Login</button>
    </div>
    </form>
    </div>
  `,
  styles: [
    `
    body {
    background: #e35869;
    font-family: rubik,sans-serif
}
    .login-form {
            background: #fff;
      width: 500px;
      margin: 65px auto;
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      border-radius: 4px;
      box-shadow: 0 2px 25px rgba(0,0,0,.2)
  }

  .login-form h1 {
      padding: 35px 35px 0;
      font-weight: 300
  }

  .login-form .content {
      padding: 35px;
      text-align: center
  }

  .login-form .input-field {
      padding: 12px 5px
  }

  .login-form .input-field input {
      font-size: 16px;
      display: block;
      font-family: rubik,sans-serif;
      width: 100%;
      padding: 10px 1px;
      border: 0;
      border-bottom: 1px solid #747474;
      outline: none;
      -webkit-transition: all .2s;
      transition: all .2s
  }

  .login-form .input-field input::-webkit-input-placeholder {
      text-transform: uppercase
  }

  .login-form .input-field input::-moz-placeholder {
      text-transform: uppercase
  }

  .login-form .input-field input:-ms-input-placeholder {
      text-transform: uppercase
  }

  .login-form .input-field input::-ms-input-placeholder {
      text-transform: uppercase
  }

  .login-form .input-field input::placeholder {
      text-transform: uppercase
  }

  .login-form .input-field input:focus {
      border-color: #222
  }

  .login-form a.link {
      text-decoration: none;
      color: #747474;
      letter-spacing: .2px;
      text-transform: uppercase;
      display: inline-block;
      margin-top: 20px
  }

  .login-form .action {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      flex-direction: row
  }

  .login-form .action button {
      width: 100%;
      border: none;
      padding: 18px;
      font-family: rubik,sans-serif;
      cursor: pointer;
      text-transform: uppercase;
      background: #e8e9ec;
      color: #777;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 0;
      letter-spacing: .2px;
      outline: 0;
      -webkit-transition: all .3s;
      transition: all .3s
  }

  .login-form .action button:hover {
      background: #d8d8d8
  }

  .login-form .action button:nth-child(2) {
      background: #2d3b55;
      color: #fff;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 4px
  }

  .login-form .action button:nth-child(2):hover {
      background: #3c4d6d
  }
    `,
  ],
})
export class RemoteEntryComponent {
  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService) {}
  login() {
    this.userService.checkCredentials(this.username, this.password);
  }
}