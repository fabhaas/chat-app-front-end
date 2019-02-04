import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from './config.service';

export interface Message {
    from: string;
    to: string | number;
    msg: string;
    timestamp: Date;
    timestring: string;
}

@Injectable()
export class ChatService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    handleError(type: 'getUserMessages' | 'getGroupMessages' | 'getGroupMembers' |
                        'deleteGroup' | 'changeGroupName' | 'addGroupMembers' |
                        'removeGroupMember' | 'blockUser' | 'leaveGroup') {
        return err => {
            if (err.status === 500) {
                console.error(err);
                return throwError('Server error, please contact the server admin');
            }

            switch (type) {
                case 'getUserMessages':
                    break;
                case 'getGroupMessages':
                    break;
                case 'getGroupMembers':
                    break;
                case 'deleteGroup':
                    break;
                case 'removeGroupMember':
                    break;
                case 'changeGroupName':
                    return throwError('You already own a group with the requested name');
                    break;
                case 'addGroupMembers':
                    return throwError('Some users cannot be found! Please check the spelling!');
                    break;
                case 'removeGroupMember':
                    break;
                case 'blockUser':
                    break;
                case 'leaveGroup':
                    break;
            }
            console.error(err);
            return throwError('Unable to get data');
        };
    }

    getUserMessages(friend: string) {
        return this.http.get(this.configService.userMsgURL + '/' + friend, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            map(res => {
                const data = (<any>res).messages;
                const ret = new Array<Message>();
                for (const msg of data) {
                    const date = new Date(msg[3]);
                    ret.push({
                        from: msg[0],
                        to: msg[1],
                        msg: msg[2],
                        timestamp: date,
                        timestring: date.toLocaleString()
                    });
                }

                return ret;
            }),
            catchError(this.handleError('getUserMessages')));
    }

    blockUser(friend: string) {
        return this.http.delete(this.configService.friendsURL + '/' + friend, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('blockUser'))
        );
    }

    getGroupMembers(groupid: number) {
        return this.http.get(this.configService.groupsURL + '/' + groupid, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            map(res => (<any>res).members),
            catchError(this.handleError('getGroupMembers'))
        );
    }

    getGroupMessages(groupid: number) {
        return this.http.get(this.configService.groupsURL + '/' + groupid + '/messages', {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            map(res => {
                const data = (<any>res).messages;
                const ret = new Array<Message>();
                for (const msg of data) {
                    const date = new Date(msg[2]);
                    ret.push({
                        from: msg[0],
                        to: groupid,
                        msg: msg[1],
                        timestamp: date,
                        timestring: date.toLocaleString()
                    });
                }

                return ret;
            }),
            catchError(this.handleError('getGroupMessages'))
        );
    }

    deleteGroup(groupid: number) {
        return this.http.delete(this.configService.groupsURL + '/' + groupid, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('deleteGroup'))
        );
    }

    removeGroupMember(groupid: number, user: string) {
        return this.http.delete(this.configService.groupsURL + '/' + groupid + '/members/' + user, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('removeGroupMember'))
        );
    }

    changeGroupName(groupid: number, newname: string) {
        return this.http.patch(this.configService.groupsURL + '/' + groupid + '/name/' + newname, {}, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('changeGroupName'))
        );
    }

    addGroupMembers(groupid: number, newMembers: string[]) {
        return this.http.post(this.configService.groupsURL + '/' + groupid + '/members', { newmembers: newMembers }, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('addGroupMembers'))
        );
    }

    leaveGroup(groupid: number) {
        return this.http.delete(this.configService.userGroupsURL + '/' + groupid, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError('leaveGroup'))
        );
    }
}
