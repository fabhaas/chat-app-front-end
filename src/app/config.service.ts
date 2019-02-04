import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ConfigService {
    public readonly serverURL = 'http://localhost:3000';
    public readonly wsServerURL = 'ws://localhost:3001';

    public readonly groupsURL = this.serverURL + '/groups';
    public readonly friendsURL = this.serverURL + '/friends';
    public readonly userURL = this.serverURL + '/user';
    public readonly loginURL = this.serverURL + '/login';
    public readonly registerURL = this.serverURL + '/register';
    public readonly userGroupsURL = this.userURL + '/groups';
    public readonly userFriendsURL = this.userURL + '/friends';
    public readonly userMsgURL = this.userURL + '/messages';
    public readonly userNameURL = this.userURL + '/name';
    public readonly userPasswordURL = this.userURL + '/password';

    private _username = new BehaviorSubject<string>(null);
    private _token = new BehaviorSubject<string>(null);
    private _friends = new BehaviorSubject<string[]>(null);
    private _groups = new BehaviorSubject<any[]>(null);

    public username = this._username.asObservable();
    public token = this._token.asObservable();
    public friends = this._friends.asObservable();
    public groups = this._groups.asObservable();

    public setUsername(val: string) {
        this._username.next(val);
        localStorage.setItem('username', val);
    }

    public setToken(val: string) {
        this._token.next(val);
        localStorage.setItem('token', val);
    }

    public setFriends(val: string[]) {
        this._friends.next(val);
        localStorage.setItem('friends', JSON.stringify(val));
    }

    public setGroups(val: string[]) {
        this._groups.next(val);
        localStorage.setItem('groups', JSON.stringify(val));
    }

    public getUsername() {
        return this._username.value;
    }

    public getToken() {
        return this._token.value;
    }

    public getFriends() {
        return this._friends.value;
    }

    public getGroups() {
        return this._groups.value;
    }

    public getAuthHeader() {
        return JSON.stringify({ name: this.getUsername(), token: this.getToken() });
    }

    public checkUsername() {
        return this._username.value ? true : false;
    }

    public checkToken() {
        return this._token.value ? true : false;
    }

    public checkFriends() {
        return this._friends.value ? true : false;
    }

    public checkGroups() {
        return this._groups.value ? true : false;
    }

    public deleteUsername() {
        this._username.next(null);
        localStorage.removeItem('username');
    }

    public deleteToken() {
        this._token.next(null);
        localStorage.removeItem('token');
    }

    public deleteFriend() {
        this._friends.next(null);
        localStorage.removeItem('friends');
    }

    public deleteGroups() {
        this._groups.next(null);
        localStorage.removeItem('groups');
    }

    public deleteAll() {
        this.deleteUsername();
        this.deleteToken();
        this.deleteFriend();
        this.deleteGroups();
        // or localStorage.clear()
    }

    public isLoggedIn() {
        return this.checkUsername() && this.checkToken();
    }

    constructor(private snackBar: MatSnackBar) {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const friends = localStorage.getItem('friends');
        const groups = localStorage.getItem('groups');

        if (username && token && groups && friends) {
            this._username.next(username);
            this._token.next(token);
            this._groups.next(JSON.parse(groups));
            this._friends.next(JSON.parse(friends));
        }
    }
}
