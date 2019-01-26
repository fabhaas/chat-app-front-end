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
var login_component_1 = require("../pages/login/login.component");
var router_1 = require("@angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(LoginComponent, router) {
        this.LoginComponent = LoginComponent;
        this.router = router;
    }
    HeaderComponent.prototype.logout = function () {
        //delete cookie
        this.LoginComponent.deleteCookie();
        this.router.navigate(["/login"]);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "my-header",
            template: "<div style=\"background-color: blue; color: white; font-size: 3em; margin: 5px; text-align: center;\">\n                <p>LetsChat</p>\n                <button \n                    class=\"btn btn-primary\" \n                    (click)=\"logout()\"\n                 >Logout</button>               \n                </div>\n                \n            "
        }),
        __metadata("design:paramtypes", [login_component_1.LoginComponent, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map