import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangeNameComponent } from '../dialogs/change-name.component';
import { ChangePasswordComponent } from '../dialogs/change-password.component';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private username: string;
  constructor(private configService: ConfigService, private router: Router, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!this.configService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.username = this.configService.getUsername();
  }

  logout() {
    this.configService.deleteAll();
    this.router.navigate(['/login']);
  }

  changeUsername() {
    const changeUsernameRef = this.matDialog.open(ChangeNameComponent, {
      width: '250px',
      data: { type: 'username' }
    });

    changeUsernameRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.snackBar.open('Please login again after changing name', 'OK', {
        duration: 5000
      });
      this.logout();
    });
  }

  changePassword() {
    const changePasswordRef = this.matDialog.open(ChangePasswordComponent, {
      width: '250px'
    });

    changePasswordRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.snackBar.open('Please login again after changing password', 'OK', {
        duration: 5000
      });
      this.logout();
    });
  }
}
