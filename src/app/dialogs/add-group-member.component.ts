import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { ConfigService } from '../config.service';
import { ChatService } from '../chat.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-dialog-add-group-member',
    templateUrl: 'add-group-member.component.html',
})
export class AddGroupMemberComponent {
    addOnBlur = true;
    newmembers = new Array<string>();
    selectable = true;
    removable = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private dialogRef: MatDialogRef<AddGroupMemberComponent>,
        @Inject(MAT_DIALOG_DATA) private groupid: number,
        private snackBar: MatSnackBar,
        private chatService: ChatService,
        private configService: ConfigService) { }

    cancel() {
        this.dialogRef.close();
    }

    change() {
        if (this.newmembers.length === 0) {
            this.snackBar.open('Please add a user!', 'OK', {
                duration: 3000
            });
            return;
        }

        this.chatService.addGroupMembers(this.groupid, this.newmembers)
            .subscribe(
                ret => { this.dialogRef.close(this.newmembers); },
                err => { this.snackBar.open(err, 'OK', { duration: 5000 }); }
            );
    }

    add(event: MatChipInputEvent): void {
        const txt = event.input;
        const val = event.value;

        if ((val || '').trim() && !this.newmembers.includes(val.trim())) {
            this.newmembers.push(val.trim());
        }

        if (txt) {
            txt.value = '';
        }
    }

    remove(member: string): void {
        const i = this.newmembers.indexOf(member);
        if (i >= 0) {
            this.newmembers.splice(i, 1);
        }
    }
}
