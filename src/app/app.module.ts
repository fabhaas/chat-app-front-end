import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule,
  MatIconModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatChipsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from './home/home.service';
import { GroupChatComponent } from './groupchat/groupchat.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ChatService } from './chat/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    HomeComponent,
    GroupChatComponent,
    TopbarComponent
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
    MatChipsModule
  ],
  providers: [
    LoginService,
    CookieService,
    HomeService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
