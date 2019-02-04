import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable()
export class AddChatService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    handleError(type: 'createGroup' | 'makeFriend') {
        return err => {
            console.error(err);
            if (type === 'createGroup') {
                if (err.status === 409) {
                    return throwError('You already own a group with that name!');
                } else if (err.status === 400) {
                    return throwError('Some requested members to not exist! Please check the spelling!');
                } else {
                    return throwError('Server error, please contact the server admin');
                }
            } else {
                if (err.status === 409) {
                    return throwError('You are already chatting with the user!');
                } else if (err.status === 400) {
                    return throwError('User does not exist!');
                } else {
                    return throwError('Server error, please contact the server admin');
                }
            }
        };
    }

    createGroup(groupname: string, groupmembers: string[]) {
        return this.http.post(this.configService.groupsURL + '/' + groupname, { members: groupmembers }, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('createGroup'))
        );
    }

    makeFriend(friend: string) {
        return this.http.post(this.configService.friendsURL + '/' + friend, {}, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('makeFriend'))
        );
    }
}
