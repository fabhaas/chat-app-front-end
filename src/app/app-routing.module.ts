import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { GroupChatComponent } from './groupchat/groupchat.component';
import { AccountComponent } from './account/account.component';
import { AddchatComponent } from './addchat/addchat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'chat', children: [
    { path: 'user/:name', component: ChatComponent },
    { path: 'group/:id', component: GroupChatComponent }
  ] },
  { path: 'account', component: AccountComponent },
  { path: 'addchat', component: AddchatComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
