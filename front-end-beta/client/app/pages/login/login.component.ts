import {Component} from '@angular/core';
import {  Router } from '@angular/router';

@Component({
    selector: "my-login",
    templateUrl: "../../client/app/pages/login/login.component.html"
})
export class LoginComponent {
    //Typescript does not allow function declarations as class members!!

    constructor(private router: Router){ 
    } 

    user:object; // for loading user information such as user name, token etc. from document.cookie //Why am i not needing fucking let or var ? 

    config = {
        serverHost: "localhost",
        serverPort: 3000,
        loginRoute: "login",
        localUsername: "localuser",  
        cookieExpiry: 3600000   //Cookie ist eine Stunde gültig
    }
    getConfig(){
        return this.config;
    }

    createCookie(jsonData: JSON){
        //Time Calc
        let now= new Date(); //Current Time 
        let time=now.getTime(); //now.getTime() returns number of milliseconds between January1, 1970 and now. 
        time += this.config.cookieExpiry;
        now.setTime(time);//now = jetzt + cookieExpiry (1h)

        let token =JSON.stringify(jsonData).split("\"");//Splitted JSON String auf, Element mit Index 3 ist der Token-Wert
        document.cookie=//Cookie wird als String-Attribut des Document Elements gespeichert 
            this.config.localUsername+'='+token[3]+//Cookie mit name=username und value ={"toke":"abcTOKENabc"}
            +';expires='+ now.toUTCString()+'; '
            +';path=/';
            console.log(token[3]);
            
    }
    deleteCookie() {
        //delete cookie
        console.log(this.config.localUsername);
        document.cookie = this.config.localUsername + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        console.log(document.cookie);
    }
    

    checkValidInput(username: HTMLInputElement, password: HTMLInputElement) {
        let validInput = true;
        if (!username.checkValidity()) {
            alert("Please enter Username");
            validInput = false;
        }
        if (!password.checkValidity()) {
            alert("Please enter a password!");
            validInput = false;
        }
        return validInput;
    }

    Login(){
        let username=<HTMLInputElement>document.getElementById("login_username");     
        let pass=<HTMLInputElement>document.getElementById("login_password");
        if (!this.checkValidInput(username, pass)) return;

        let loginUrl = `http://${this.config.serverHost}:${this.config.serverPort}/${this.config.loginRoute}/${username.value}`; // http://localhost:3000/login/USERNAME 
        
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=() => {
            if (xhttp.readyState === 4) {
                if(xhttp.status==200){//Response erhalten
                
                    //alert("Login succeeded - Welcome to LetsChat");
                    
                    //this.config.localUsername=username.value;
                    let jsonResponseData = JSON.parse(xhttp.response); 

                    this.createCookie(jsonResponseData);//Übergibt Token als String an createCookie
                    if(document.cookie){this.router.navigate([`/home`]);}


                } else if (xhttp.status === 400) alert("Error occured!");
                else if (xhttp.status === 401) alert("Login failed!");
            }
          };
          
          //Request:
          xhttp.open("POST", loginUrl);
          xhttp.setRequestHeader("Content-Type", "application/json");
          xhttp.send(JSON.stringify({ //Convertiert den JavaScript-Wert in einen JSON-String
            password: pass.value
        }));
    }

}



