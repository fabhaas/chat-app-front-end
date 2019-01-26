
import { NgModule }      from '@angular/core';
import {HttpModule }      from '@angular/http';
import {FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import{RouterModule} from '@angular/router'


//Eigene Angular-Components müssen hier importiert und unter declarations deklariert werden 
import { AppComponent }  from './app.component';
import { HeaderComponent } from './elements/header.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home.component';
import { ChatComponent } from './pages/chat.component';
import { FriendComponent } from './elements/friend.component';
import { NachrichtComponent } from './elements/nachricht.component';






@NgModule({
    imports: [ 
      BrowserModule,
      FormsModule,
      HttpModule,
      //Links zu den verschiedenen Pages
      RouterModule.forRoot([ 
        {path: '', component: LoginComponent},
        {path: 'login', component: LoginComponent},
        {path: 'home', component: HomeComponent},
        {path: 'chat/:name', component: ChatComponent}

      ],{
        useHash:true
      })
    ],

    declarations: [ 
      AppComponent,
      HeaderComponent,
      LoginComponent,
      HomeComponent,
      ChatComponent,
      FriendComponent,
      NachrichtComponent
      
    ],
    bootstrap: [ AppComponent ],

    providers: [
      LoginComponent
    ]

  })
  export class AppModule {   }
