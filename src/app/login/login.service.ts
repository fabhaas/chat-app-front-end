import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface LoginResult {
    token: string;
}

@Injectable()
export class LoginService {
    serverURL = 'http://localhost:3000';
    loginURL = this.serverURL + '/login/';

    constructor(private http: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            return throwError('Unable to send login request');
        } else {
            return throwError('Wrong username or password');
        }
    }

    login(username: string, password: string) {
        return this.http.post(this.loginURL + username, { password: password })
            .pipe(
                retry(3),
                catchError(this.handleError));
    }
}
