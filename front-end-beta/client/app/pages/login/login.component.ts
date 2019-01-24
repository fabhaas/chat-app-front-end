import {Component} from '@angular/core';
import {  Router } from '@angular/router';



@Component({
    selector: "my-login",
    templateUrl: "../../client/app/pages/login/login.component.html"
})
export class LoginComponent {
    //Typescript does not allow function declarations as class members!!

    constructor(private router: Router){ //Warum das in Klammer?
    } 
  
    config = {
        serverHost: "localhost",
        serverPort: 3000,
        loginRoute: "login",
        localUserInfo: "wt18user",
        cookieExpiry: 3600000,
    }

    checkValidInput() {
        let validInput = true;
        if (!document.getElementById("login_username").checkValidity()) {
            alert("Please enter Username");
            validInput = false;
        }
        if (!document.getElementById("login_password").checkValidity()) {
            alert("Please enter a password!");
            validInput = false;
        }
        return validInput;
    }

    Login(){
        if (!this.checkValidInput()) return;//Check validity generates some errors 
        
        let loginUrl = `http://${this.config.serverHost}:${this.config.serverPort}/${this.config.loginRoute}/${document.getElementById("login_username").value}`; // http://localhost:3000/login/USERNAME 
        let router: Router=this.router;//needed because this.router can't be used in XMLHttpRequest ("this" reffers to XMLHttpRequest!)

        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(this.status==200){
                    
                    //Ergebnis empfangen - und jetzt?? 
                    alert("Login succeeded - Welcome to LetsChat");
                    console.log(this.responseText);
                    router.navigate([`/home`]);
                } else if (xhttp.status === 400) alert("Error occured!");
                else if (xhttp.status === 401) alert("Login failed!");
            }
          });
          
          //Request:
          xhttp.open("POST", loginUrl);
          xhttp.setRequestHeader("Content-Type", "application/json");
          xhttp.send(JSON.stringify({ //Convertiert den JavaScript-Wert in einen JSON-String
            password: document.getElementById("login_password").value
        }));
    


    
    }


    //TESTING AREA ENDE  
}



