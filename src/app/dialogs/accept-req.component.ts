import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from '../home/home.service';

export interface AcceptReqDialogData {
    reqType: 'friend request' | 'group request';
    reqFromName: string;
    reqFromId?: number;
}

@Component({
    selector: 'app-dialog-accept-friend-req',
    templateUrl: 'accept-req.component.html',
})
export class AcceptReqComponent {

    constructor(
        private dialogRef: MatDialogRef<AcceptReqComponent>,
        @Inject(MAT_DIALOG_DATA) private data: AcceptReqDialogData,
        private homeService: HomeService,
        private snackBar: MatSnackBar
    ) { }

    cancel() {
        this.dialogRef.close();
    }

    change() {
        if (this.data.reqType === 'friend request') {
            this.homeService.acceptFriendReq(this.data.reqFromName).subscribe(
                () => this.dialogRef.close(true),
                err => {
                    this.snackBar.open(err, 'OK', {
                        duration: 5000
                    });
                    this.dialogRef.close();
                }
            );
        } else {
            this.homeService.acceptGroupReq(this.data.reqFromId).subscribe(
                () => this.dialogRef.close(true),
                err => {
                    this.snackBar.open(err, 'OK', {
                        duration: 5000
                    });
                    this.dialogRef.close();
                }
            );
        }
    }
}
