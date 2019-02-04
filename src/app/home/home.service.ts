import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable()
export class HomeService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    handleError(reqType: string) {
        return err => {
            console.error(err);
            if (err.error instanceof ErrorEvent) {
                return throwError('Unable to get data');
            } else {
                return throwError('Server error, please contact the server admin');
            }
        };
    }

    getGroups() {
        return this.http.get(this.configService.userGroupsURL, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('getGroup')));
    }

    getFriends() {
        return this.http.get(this.configService.userFriendsURL, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('getFriends')));
    }

    acceptFriendReq(friend: string) {
        return this.http.patch(this.configService.friendsURL + '/' + friend, {}, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('acceptFriendReq')));
    }

    acceptGroupReq(group: number) {
        return this.http.patch(this.configService.groupsURL + '/' + group + '/accept', {}, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('acceptGroupReq'))
        );
    }
}
