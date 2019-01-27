import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: [];
  friends: [];
  constructor(private homeService: HomeService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    const username = this.cookieService.get('username');
    const token = this.cookieService.get('token');
    if (username.length === 0 || token.length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    this.homeService.setUsername(username);
    this.homeService.setToken(token);

    this.homeService.getGroups()
      .subscribe(data => {
        this.groups = (<any>data).groups;
      }, err => alert(err));

    this.homeService.getFriends()
      .subscribe(data => {
        this.friends = (<any>data).friends;
      }, err => alert(err));
  }

  openGroup(group) {
    console.log(group);
  }

  openFriend(friend: any[]) {
    if (friend[1]) {
        this.router.navigate(['/chat/user', friend[0]]);
    } else {
      alert('Please wait for the user to accept your request!');
    }
  }
}
