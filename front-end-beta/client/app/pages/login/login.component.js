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
            localUserInfo: "wt18user",
            cookieExpiry: 3600000,
        };
    }
    LoginComponent.prototype.checkValidInput = function () {
        var validInput = true;
        if (!document.getElementById("login_username").checkValidity()) {
            alert("Please enter Username");
            validInput = false;
        }
        if (!document.getElementById("login_password").checkValidity()) {
            alert("Please enter a password!");
            validInput = false;
        }
        return validInput;
    };
    LoginComponent.prototype.Login = function () {
        if (!this.checkValidInput())
            return; //Check validity generates some errors 
        var loginUrl = "http://" + this.config.serverHost + ":" + this.config.serverPort + "/" + this.config.loginRoute + "/" + document.getElementById("login_username").value; // http://localhost:3000/login/USERNAME 
        var router = this.router; //needed because this.router can't be used in XMLHttpRequest ("this" reffers to XMLHttpRequest!)
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status == 200) {
                    //Ergebnis empfangen - und jetzt?? 
                    alert("Login succeeded - Welcome to LetsChat");
                    console.log(this.responseText);
                    router.navigate(["/home"]);
                }
                else if (xhttp.status === 400)
                    alert("Error occured!");
                else if (xhttp.status === 401)
                    alert("Login failed!");
            }
        });
        //Request:
        xhttp.open("POST", loginUrl);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            password: document.getElementById("login_password").value
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