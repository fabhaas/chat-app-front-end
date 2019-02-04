import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AccountService } from '../account/account.service';
import { ConfigService } from '../config.service';

@Component({
    selector: 'app-dialog-change-password',
    templateUrl: 'change-password.component.html',
})
export class ChangePasswordComponent {
    oldPassword = '';
    newPassword0 = '';
    newPassword1 = '';
    oldHide = true;
    newHide0 = true;
    newHide1 = true;

    constructor(
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private snackBar: MatSnackBar,
        private accountService: AccountService,
        private configService: ConfigService) { }

    cancel() {
        this.dialogRef.close(false);
    }

    change() {
        if (this.oldPassword.length === 0 || this.newPassword0.length === 0 || this.newPassword1.length === 0) {
            this.snackBar.open('Please type the old password, a new password, and repeat the new password!', 'OK', {
                duration: 5000
            });
            return;
        }

        if (this.newPassword0 !== this.newPassword1) {
            this.snackBar.open('The two new passwords do not match!', 'OK', {
                duration: 5000
            });
            return;
        }

        this.accountService.changePassword(this.oldPassword, this.newPassword0)
            .subscribe(
                ret => { this.dialogRef.close(true); },
                err => { this.snackBar.open(err, 'OK', {
                    duration: 5000
                }); }
            );
    }
}
