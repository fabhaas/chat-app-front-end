import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.cookieService.delete('username');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
