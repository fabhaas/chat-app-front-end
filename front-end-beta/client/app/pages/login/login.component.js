"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var LoginComponent = /** @class */ (function () {
    //Typescript does not allow function declarations as class members!!
    function LoginComponent(router) {
        this.router = router;
        this.config = {
            serverHost: "localhost",
            serverPort: 3000,
            loginRoute: "login",
            localUsername: "localuser",
            cookieExpiry: 3600000 //Cookie ist eine Stunde gültig
        };
    }
    LoginComponent.prototype.getConfig = function () {
        return this.config;
    };
    LoginComponent.prototype.createCookie = function (jsonData) {
        //Time Calc
        var now = new Date(); //Current Time 
        var time = now.getTime(); //now.getTime() returns number of milliseconds between January1, 1970 and now. 
        time += this.config.cookieExpiry;
        now.setTime(time); //now = jetzt + cookieExpiry (1h)
        var token = JSON.stringify(jsonData).split("\""); //Splitted JSON String auf, Element mit Index 3 ist der Token-Wert
        document.cookie = //Cookie wird als String-Attribut des Document Elements gespeichert 
            this.config.localUsername + '=' + token[3] + //Cookie mit name=username und value ={"toke":"abcTOKENabc"}
                +';expires=' + now.toUTCString() + '; '
                + ';path=/';
        console.log(token[3]);
    };
    LoginComponent.prototype.deleteCookie = function () {
        //delete cookie
        console.log(this.config.localUsername);
        document.cookie = this.config.localUsername + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        console.log(document.cookie);
    };
    LoginComponent.prototype.checkValidInput = function (username, password) {
        var validInput = true;
        if (!username.checkValidity()) {
            alert("Please enter Username");
            validInput = false;
        }
        if (!password.checkValidity()) {
            alert("Please enter a password!");
            validInput = false;
        }
        return validInput;
    };
    LoginComponent.prototype.Login = function () {
        var _this = this;
        var username = document.getElementById("login_username");
        var pass = document.getElementById("login_password");
        if (!this.checkValidInput(username, pass))
            return;
        var loginUrl = "http://" + this.config.serverHost + ":" + this.config.serverPort + "/" + this.config.loginRoute + "/" + username.value; // http://localhost:3000/login/USERNAME 
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                if (xhttp.status == 200) { //Response erhalten
                    //alert("Login succeeded - Welcome to LetsChat");
                    //this.config.localUsername=username.value;
                    var jsonResponseData = JSON.parse(xhttp.response);
                    _this.createCookie(jsonResponseData); //Übergibt Token als String an createCookie
                    if (document.cookie) {
                        _this.router.navigate(["/home"]);
                    }
                }
                else if (xhttp.status === 400)
                    alert("Error occured!");
                else if (xhttp.status === 401)
                    alert("Login failed!");
            }
        };
        //Request:
        xhttp.open("POST", loginUrl);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            password: pass.value
        }));
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-login",
            templateUrl: "../../client/app/pages/login/login.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map