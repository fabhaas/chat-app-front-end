import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HomeService {
    serverURL = 'http://localhost:3000';
    groupsURL = this.serverURL + '/groups';
    friendsURL = this.serverURL + '/friends';
    username: string;
    token: string;

    constructor(private http: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        console.error(error);
        if (error.error instanceof ErrorEvent) {
            return throwError('Unable to get data');
        } else {
            return throwError('Server error, please contact the server admin');
        }
    }

    setUsername(username: string) { this.username = username; }
    setToken(token: string) { this.token = token; }

    getGroups() {
        return this.http.get(this.groupsURL , {
            headers: {
                'authorization': JSON.stringify({ name: this.username, token: this.token })
            }
        }).pipe(
            retry(3),
            catchError(this.handleError));
    }

    getFriends() {
        return this.http.get(this.friendsURL , {
            headers: {
                'authorization': JSON.stringify({ name: this.username, token: this.token })
            }
        }).pipe(
            retry(3),
            catchError(this.handleError));
    }
}
