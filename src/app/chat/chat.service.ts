import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ChatService {
    serverURL = 'http://localhost:3000';
    msgURL = this.serverURL + '/user/messages/';
    username: string;
    token: string;
    friend: string;

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
    setFriendUsername(username: string) { this.friend = username; }
    setToken(token: string) { this.token = token; }

    getMessages() {
        return this.http.get(this.msgURL + this.friend, {
            headers: {
                'authorization': JSON.stringify({ name: this.username, token: this.token })
            }
        }).pipe(
            retry(3),
            catchError(this.handleError));
    }
}
