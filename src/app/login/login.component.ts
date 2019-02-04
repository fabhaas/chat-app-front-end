import { Component } from '@angular/core';
import { LoginService, LoginResult } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  username = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private configService: ConfigService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        (data: LoginResult) => {
          this.configService.setToken(data.token);
          this.configService.setUsername(this.username);
          this.router.navigate(['/home']);
        }, err => this.snackBar.open(err, 'OK', {
          duration: 3000
        }));
  }

  register() {
    this.loginService.register(this.username, this.password)
      .subscribe(
        (data: LoginResult) => {
          this.login();
        }, err => this.snackBar.open(err, 'OK', {
          duration: 3000
        }));
  }
}
