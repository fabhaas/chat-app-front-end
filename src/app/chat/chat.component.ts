import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from './chat.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friend: string;
  messages: Array<any[]>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.friend = params['name']);
    const username = this.cookieService.get('username');
    const token = this.cookieService.get('token');
    if (username.length === 0 || token.length === 0 || this.friend.length === 0) {
      this.router.navigate(['/login']);
      return;
    }

    this.chatService.setUsername(username);
    this.chatService.setToken(token);
    this.chatService.setFriendUsername(this.friend);

    this.chatService.getMessages()
      .subscribe(data => {
        this.messages = (<any>data).messages;
        for (const message of this.messages) {
          const tmp = new Date(message[3]);
          message[3] = tmp.getHours() + ':' + tmp.getMinutes();
        }
      }, err => alert(err));
  }
}
