import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AddChatService } from './addchat.service';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-addchat',
  templateUrl: './addchat.component.html',
  styleUrls: ['./addchat.component.css']
})
export class AddchatComponent implements OnInit {
  types = ['Create group', 'Start chat with user'];
  selectable = true;
  removable = true;
  addOnBlur = true;
  configGroup: FormGroup;
  chooseTypeGroup: FormGroup;
  selectedType: 'Create group' | 'Start chat with user';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private groupMembers = new Array<string>();
  // private friends = new Array<string>(); // part of not working autocomplete

  constructor(
    private formBuilder: FormBuilder,
    private addChatService: AddChatService,
    private configService: ConfigService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (!this.configService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // not working autocomplete
    /*this.configService.friends.subscribe(res => {
      if (res) {
        for (const friend of res) {
          this.friends.push(friend[0]);
        }
      }
    });*/

    this.chooseTypeGroup = this.formBuilder.group({
      cbType: ['', Validators.required]
    });
    this.configGroup = this.formBuilder.group({
      txtName: ['', Validators.required],
      chMembers: [''],
      txtMembers: ['']
    });
  }

  selectType() {
    this.selectedType = this.chooseTypeGroup.get('cbType').value;
  }

  add(event: MatChipInputEvent): void {
    const txt = event.input;
    const val = event.value;

    if ((val || '').trim() && !this.groupMembers.includes(val.trim())) {
      this.groupMembers.push(val.trim());
    }

    if (txt) {
      txt.value = '';
    }
  }

  remove(member: string): void {
    const i = this.groupMembers.indexOf(member);
    if (i >= 0) {
      this.groupMembers.splice(i, 1);
    }
  }

  // not working autocomplete
  /*autoComplSelected(event: MatAutocompleteSelectedEvent) {
    if (!this.groupMembers.includes(event.option.viewValue)) {
      this.groupMembers.push(event.option.viewValue);
    }
    (<any>document.getElementById('txtMembers')).value = '';
  }*/

  finish() {
    if (this.selectedType === 'Create group') {
      const name = this.configGroup.get('txtName').value;
      if (name && name.length !== 0) {
        this.addChatService.createGroup(name, this.groupMembers)
          .subscribe(
            ret => this.router.navigate(['/home']),
            err => this.snackBar.open(err, 'OK', {
              duration: 5000
            })
          );
      }
    } else if (this.selectedType === 'Start chat with user') {
      const name = this.configGroup.get('txtName').value;
      if (name && name.length !== 0) {
        this.addChatService.makeFriend(name)
          .subscribe(
            ret => this.router.navigate(['/home']),
            err => this.snackBar.open(err, 'OK', {
              duration: 5000
            })
          );
      }
    }
  }
}
