import {Component} from '@angular/core';
import {  Router } from '@angular/router';



@Component({
    selector: "my-login",
    templateUrl: "../../client/app/pages/login.component.html"
})
export class LoginComponent {

    constructor(private router: Router){
    }
    
    //Login über Datenbank !!!
    Login(email: string, password: string){
        
        if(email=="admin@test.at"&&password=="admin"){
            this.router.navigate([`/home`]);
        }else {alert("Login failed! Try again!")}
    }
    
}




