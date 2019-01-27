import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { GroupChatComponent } from './groupchat/groupchat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'chat', children: [
    { path: 'user/:name', component: ChatComponent },
    { path: 'group/:id', component: GroupChatComponent }
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
