import { Component } from '@angular/core';
import { LoginService, LoginResult } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  username = '';
  password = '';

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        (data: LoginResult) => {
          this.cookieService.set('token', data.token);
          this.cookieService.set('username', this.username);
          console.log(`Token: ${this.cookieService.get('token')}`);
          this.router.navigate(['/home']);
        }, err => alert(err));
  }

  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) { }
}
