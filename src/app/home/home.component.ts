import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { WebSocketService } from '../websocket.service';
import { AcceptReqComponent } from '../dialogs/accept-req.component';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: [];
  friends: [];
  constructor(
    private homeService: HomeService,
    private configService: ConfigService,
    private wsService: WebSocketService,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    if (!this.configService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.wsService.init();
    this.wsService.authenticate();
    this.wsService.authMsgReceived().subscribe();

    this.loadFriends();
    this.loadGroups();

    this.wsService.refreshAllReceived()
      .subscribe(() => {
        this.loadFriends();
        this.loadGroups();
      });

      this.wsService.refreshGroupsReceived()
      .subscribe(() => {
        this.loadGroups();
      });

      this.wsService.refreshFriendsReceived()
      .subscribe(() => {
        this.loadFriends();
      });
  }

  loadGroups() {
    this.homeService.getGroups()
      .subscribe(data => {
        this.groups = (<any>data).groups;
        this.configService.setGroups(this.groups);
      }, err => this.snackBar.open(err, 'OK', {
        duration: 3000
      }));
  }

  loadFriends() {
    this.homeService.getFriends()
      .subscribe(data => {
        this.friends = (<any>data).friends;
        this.configService.setFriends(this.friends);
      }, err => this.snackBar.open(err, 'OK', {
        duration: 3000
      }));
  }

  openGroup(group) {
    if (group[3]) {
      this.router.navigate(['/chat/group', group[0]]);
    } else {
      const dialogRef = this.matDialog.open(AcceptReqComponent, {
        width: '250px',
        data: { reqType: 'group request', reqFromName: group[1], reqFromId: group[0] }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (!res) {
          return;
        }

        this.router.navigate(['/chat/group', group[0]]);
      });
    }
  }

  openFriend(friend: any[]) {
    if (friend[1] && friend[2]) {
      this.router.navigate(['/chat/user', friend[0]]);
    } else if (friend[1]) {
      this.snackBar.open('Please wait for the user to accept your request!', 'OK', {
        duration: 3000
      });
    } else {
      const dialogRef = this.matDialog.open(AcceptReqComponent, {
        width: '250px',
        data: { reqType: 'friend request', reqFromName: friend[0] }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (!res) {
          return;
        }

        this.router.navigate(['/chat/user', friend[0]]);
      });
    }
  }

  addChat() {
    this.router.navigate(['/addchat']);
  }
}
