import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../account/account.service';
import { ConfigService } from '../config.service';
import { ChatService } from '../chat.service';

interface ChangeNameData {
    type: 'username' | 'groupname';
    groupid?: number;
}

@Component({
    selector: 'app-dialog-change-name',
    templateUrl: 'change-name.component.html',
})
export class ChangeNameComponent {
    private newname = '';

    constructor(
        private dialogRef: MatDialogRef<ChangeNameComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ChangeNameData,
        private snackBar: MatSnackBar,
        private accountService: AccountService,
        private chatService: ChatService,
        private configService: ConfigService) { }

    cancel() {
        this.dialogRef.close();
    }

    change() {
        if (this.newname.length === 0) {
            this.snackBar.open(`Please type in a new ${this.data.type}!`, 'OK', {
                duration: 3000
            });
            return;
        }

        if (this.data.type === 'username') {
            // it is safe to access the username and token directly because AccountComponent
            // can only be accessed when the correct username and token are set,
            // see ngInit in AccountComponent
            this.accountService.changeUsername(this.newname)
                .subscribe(
                    ret => { this.dialogRef.close(this.newname); },
                    err => { this.snackBar.open(err, 'OK', { duration: 5000 }); }
                );
        } else {
            this.chatService.changeGroupName(this.data.groupid, this.newname)
                .subscribe(
                    ret => { this.dialogRef.close(this.newname); },
                    err => { this.snackBar.open(err, 'OK', { duration: 5000 }); }
                );
        }
    }
}
