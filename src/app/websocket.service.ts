import { Injectable } from '@angular/core';
import { filter, map, timeout } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket/index';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, range } from 'rxjs';
import { Message } from './chat.service';
import { ConfigService } from './config.service';

@Injectable()
export class WebSocketService {
    private serverURL = this.configService.wsServerURL;
    private ws: WebSocketSubject<{}>;
    private restarting = false;

    constructor(private snackBar: MatSnackBar, private router: Router, private configService: ConfigService) {
    }

    init(restart?: boolean) {
        if (this.ws && !restart) {
            return;
        }

        this.restarting = true;

        if (this.ws) {
            this.ws.complete();
        }

        this.ws = webSocket({
            url: this.serverURL,
            closeObserver: {
                next: e => {
                    if (this.restarting) {
                        return;
                    } else {
                        this.snackBar.open('Cannot connect to the server! Please try again later!', 'OK');
                        this.router.navigate(['']);
                    }
                }
            }
        });

        this.ws.subscribe(
            msg => { console.log(msg); },
            err => { console.error(err); },
            () => { console.log('WebSocket closed!'); }
        );
        this.restarting = false;
    }

    authenticate() {
        this.ws.next({
            event: 'auth',
            data: [this.configService.getUsername(), this.configService.getToken()]
        });
    }

    sendUserMsg(friend: string, msg: string) {
        this.ws.next({
            event: 'usermessage',
            data: [friend, msg]
        });
    }

    sendGroupMsg(groupid: number, msg: string) {
        this.ws.next({
            event: 'groupmessage',
            data: [groupid, msg]
        });
    }

    refreshAllReceived() {
        return this.ws
            .pipe(
                filter(e => {
                    if ((<any>e).event === 'refreshall') {
                        return true;
                    }
                }),
                map(e => (<any>e).data)
            );
    }

    refreshGroupsReceived(groupid?: number) {
        return this.ws
            .pipe(
                filter(e => {
                    if ((<any>e).event === 'refreshgroups') {
                        if (groupid) {
                            // required
                            // tslint:disable-next-line:triple-equals
                            if ((<any>e).data[1] == groupid) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    }
                }),
                map(e => (<any>e).data)
            );
    }

    refreshFriendsReceived(friend?: string) {
        return this.ws
            .pipe(
                filter(e => {
                    if ((<any>e).event === 'refreshfriends') {
                        if (this.configService.getUsername() && friend) {
                            if ((<any>e).data[1] === this.configService.getUsername() && (<any>e).data[2] === friend ||
                            (<any>e).data[1] === friend && (<any>e).data[2] === this.configService.getUsername()) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    }
                }),
                map(e => (<any>e).data)
            );
    }

    authMsgReceived() {
        return this.ws
            .pipe(
                filter(e => (<any>e).event === 'auth_success')
            );
    }

    userMsgReceived(friend: string): Observable<Message[]> {
        return this.ws
            .pipe(
                filter(e => {
                    if ((<any>e).event === 'usermessage') {
                        if ((<any>e).data[0] === friend || (<any>e).data[0] === this.configService.getUsername()) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }),
                map(e => {
                    const data = (<any>e).data;
                    const date = new Date(data[3]);
                    return [{
                        from: data[0],
                        to: data[1],
                        msg: data[2],
                        timestamp: date,
                        timestring: date.toLocaleString()
                    }];
                })
            );
    }

    groupMsgReceived(groupid: number): Observable<Message[]> {
        return this.ws
            .pipe(
                filter(e => {
                    if ((<any>e).event === 'groupmessage') {
                        // because typeof <any>e.data[1] === 'string'
                        // tslint:disable-next-line:triple-equals
                        if ((<any>e).data[1] == groupid) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }),
                map(e => {
                    const data = (<any>e).data;
                    const date = new Date(data[3]);
                    return [{
                        from: data[0],
                        to: data[1],
                        msg: data[2],
                        timestamp: date,
                        timestring: date.toLocaleString()
                    }];
                })
            );
    }
}
