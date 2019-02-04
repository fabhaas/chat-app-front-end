import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService, Message } from '../chat.service';
import { WebSocketService } from '../websocket.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ChangeNameComponent } from '../dialogs/change-name.component';
import { AddGroupMemberComponent } from '../dialogs/add-group-member.component';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupChatComponent implements OnInit {
  isGroupOwner = false;
  groupmembers = new Array<any[]>();
  group: any[];
  messages: GroupChatDataSource;
  displayedColumns = ['user', 'msg', 'timestamp'];
  private groupid: number;
  private leavingGroup = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private chatService: ChatService,
    private wsService: WebSocketService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.groupid = params['id']);
    if (!this.configService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.wsService.init();
    this.wsService.authenticate();

    const groups = this.configService.getGroups();
    for (const group of groups) {
      // required
      // tslint:disable-next-line:triple-equals
      if (group[0] == this.groupid) {
        this.group = group;
        this.isGroupOwner = group[2] === this.configService.getUsername();
      }
    }

    this.loadGroupMembers();
    this.loadGroupMessages();

    this.wsService.refreshAllReceived()
      .subscribe(() => {
        this.loadGroupMessages();
        this.loadGroupMembers();
      });
    this.wsService.refreshGroupsReceived(this.groupid)
      .subscribe((res) => {
        switch (res[0]) {
          case 'deleted':
            this.snackBar.open('The group owner deleted the group', 'OK');
            this.router.navigate(['/home']);
            break;
          case 'members changed':
            if (!this.leavingGroup) {
              this.loadGroupMembers();
            }
            break;
        }
      });
  }

  loadGroupMessages() {
    this.messages = new GroupChatDataSource(this.chatService, this.wsService, this.groupid);
  }

  loadGroupMembers() {
    this.chatService.getGroupMembers(this.groupid).subscribe(
      res => { this.groupmembers = res; },
      err => {
        this.snackBar.open(err, 'OK', {
          duration: 5000
        });
      });

  }

  sendMsg() {
    const txt = (<any>document.getElementById('txtMsg'));
    const msg: string = txt.value;
    txt.value = '';
    if (msg.length === 0) {
      return;
    }

    this.wsService.sendGroupMsg(this.groupid, msg);
  }

  removeGroupMember(user: string) {
    this.chatService.removeGroupMember(this.groupid, user)
      .subscribe(
        res => { this.loadGroupMembers(); },
        err => {
          this.snackBar.open(err, 'OK', {
            duration: 5000
          });
        }
      );
  }

  deleteGroup() {
    this.chatService.deleteGroup(this.groupid)
      .subscribe(
        res => { this.router.navigate(['/home']); },
        err => {
          this.snackBar.open(err, 'OK', {
            duration: 5000
          });
        }
      );
  }

  changeGroupName() {
    const dialogRef = this.matDialog.open(ChangeNameComponent, {
      width: '250px',
      data: { type: 'group name', groupid: this.groupid }
    });

    dialogRef.afterClosed().subscribe(res => { this.group[1] = res; });
  }

  addGroupMembers() {
    const dialogRef = this.matDialog.open(AddGroupMemberComponent, {
      width: '250px',
      data: this.groupid
    });

    dialogRef.afterClosed().subscribe(res => { this.loadGroupMembers(); });
  }

  leaveGroup() {
    this.leavingGroup = true;
    this.chatService.leaveGroup(this.groupid)
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        err => {
          this.leavingGroup = false;
          this.snackBar.open(err, 'OK', {
            duration: 5000
          });
        }
      );
  }

  scrollToBottom() {
    // bad workaround
    setTimeout(() => document.getElementById('tHistory').scrollIntoView(false), 200);
  }
}
export class GroupChatDataSource extends DataSource<any> {
  messages = new BehaviorSubject<Message[]>([]);

  constructor(
    private chatService: ChatService,
    private wsService: WebSocketService,
    private groupid: number
  ) {
    super();
    this.chatService.getGroupMessages(this.groupid)
      .subscribe(messages => this.messages.next(this.messages.getValue().concat(messages)));
    this.wsService.groupMsgReceived(this.groupid).subscribe(messages => this.messages.next(this.messages.getValue().concat(messages)));
  }

  connect(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  disconnect() { }
}
