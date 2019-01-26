import {Component} from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import {  Router } from '@angular/router';


@Component({
    selector: "my-header",
    template: `<div style="background-color: blue; color: white; font-size: 3em; margin: 5px; text-align: center;">
                <p>LetsChat</p>
                <button 
                    class="btn btn-primary" 
                    (click)="logout()"
                 >Logout</button>               
                </div>
                
            `
    
})
export class HeaderComponent {

    constructor(private LoginComponent: LoginComponent, private router: Router){    }

    logout() {//can't access LocalComponent directly in html 
        //delete cookie
        this.LoginComponent.deleteCookie();

        this.router.navigate([`/login`]);
    }

}