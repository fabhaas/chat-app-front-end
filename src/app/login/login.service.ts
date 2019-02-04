import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';

export interface LoginResult {
    token: string;
}

@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    handleError(type: 'login' | 'register') {
        return err => {
            if (type === 'login') {
                if (err.error instanceof ErrorEvent) {
                    return throwError('Unable to send login request');
                } else {
                    return throwError('Wrong username or password');
                }
            } else {
                if (err.error instanceof ErrorEvent) {
                    return throwError('Unable to send registration request');
                } else {
                    return throwError('User already exists! Please choose a different username!');
                }
            }
        };
    }

    login(username: string, password: string) {
        return this.http.post(this.configService.loginURL + '/' + username, { password: password })
            .pipe(
                retry(3),
                catchError(this.handleError('login'))
            );
    }

    register(username: string, password: string) {
        return this.http.post(this.configService.registerURL + '/' + username, { password: password })
            .pipe(
                retry(3),
                catchError(this.handleError('register'))
            );
    }
}
