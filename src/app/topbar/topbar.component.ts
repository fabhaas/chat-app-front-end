import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private configService: ConfigService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  navigateToAccount() {
    if (this.configService.isLoggedIn()) {
      this.router.navigate(['/account']);
    } else {
      this.snackBar.open('Please login to view your account!', 'OK', {
        duration: 5000
      });
    }
  }

  logout() {
    this.configService.deleteAll();
    this.router.navigate(['/login']);
  }
}
