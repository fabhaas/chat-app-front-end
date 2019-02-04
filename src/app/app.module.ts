import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {
  MatToolbarModule, MatIconModule, MatInputModule,
  MatCardModule, MatButtonModule, MatListModule,
  MatSnackBarModule, MatTableModule, MatMenuModule,
  MatDialogModule, MatStepperModule, MatSelectModule,
  MatChipsModule, MatAutocompleteModule, MatExpansionModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { HomeService } from './home/home.service';
import { GroupChatComponent } from './groupchat/groupchat.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ChatService } from './chat.service';
import { WebSocketService } from './websocket.service';
import { AccountComponent } from './account/account.component';
import { ChangeNameComponent } from './dialogs/change-name.component';
import { AccountService } from './account/account.service';
import { ChangePasswordComponent } from './dialogs/change-password.component';
import { AcceptReqComponent } from './dialogs/accept-req.component';
import { AddchatComponent } from './addchat/addchat.component';
import { AddChatService } from './addchat/addchat.service';
import { ConfigService } from './config.service';
import { AddGroupMemberComponent } from './dialogs/add-group-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    HomeComponent,
    GroupChatComponent,
    TopbarComponent,
    AccountComponent,
    ChangeNameComponent,
    ChangePasswordComponent,
    AcceptReqComponent,
    AddchatComponent,
    AddGroupMemberComponent
  ],
  entryComponents: [
    ChangeNameComponent,
    ChangePasswordComponent,
    AcceptReqComponent,
    AddGroupMemberComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    HomeService,
    ChatService,
    WebSocketService,
    AccountService,
    AddChatService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
