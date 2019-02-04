import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService, Message } from '../chat.service';
import { WebSocketService } from '../websocket.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../config.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friend: string;
  messages: ChatDataSource;
  displayedColumns = ['user', 'msg', 'timestamp'];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private chatService: ChatService,
    private wsService: WebSocketService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.friend = params['name']);

    if (!this.configService.isLoggedIn() || this.friend.length === 0) {
      this.router.navigate(['/login']);
      return;
    }

    this.wsService.init();
    this.wsService.authenticate();

    this.loadMessages();

    this.wsService.refreshAllReceived()
      .subscribe(() => { this.loadMessages(); });

    this.wsService.refreshFriendsReceived(this.friend)
      .subscribe(res => {
        if (res[0] === 'deleted') {
          if (res[1] !== this.configService.getUsername()) {
            this.snackBar.open('The other user blocked you', 'OK');
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      });
  }

  loadMessages() {
    this.messages = new ChatDataSource(this.chatService, this.wsService, this.friend);
  }

  sendMsg() {
    const txt = (<any>document.getElementById('txtMsg'));
    const msg: string = txt.value;
    txt.value = '';
    if (msg.length === 0) {
      return;
    }

    this.wsService.sendUserMsg(this.friend, msg);
  }

  blockUser() {
    this.chatService.blockUser(this.friend)
      .subscribe(
        () => { },
        err => {
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

export class ChatDataSource extends DataSource<any> {
  messages = new BehaviorSubject<Message[]>([]);

  constructor(
    private chatService: ChatService,
    private wsService: WebSocketService,
    private friend: string
  ) {
    super();
    this.chatService.getUserMessages(this.friend)
      .subscribe(messages => this.messages.next(this.messages.getValue().concat(messages)));
    this.wsService.userMsgReceived(this.friend).subscribe(messages => this.messages.next(this.messages.getValue().concat(messages)));
  }

  connect(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  disconnect() { }
}
