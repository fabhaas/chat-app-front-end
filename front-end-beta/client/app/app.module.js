"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
//Eigene Angular-Components müssen hier importiert und unter declarations deklariert werden 
var app_component_1 = require("./app.component");
var header_component_1 = require("./elements/header.component");
var login_component_1 = require("./pages/login/login.component");
var home_component_1 = require("./pages/home.component");
var chat_component_1 = require("./pages/chat.component");
var friend_component_1 = require("./elements/friend.component");
var nachricht_component_1 = require("./elements/nachricht.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                //Links zu den verschiedenen Pages
                router_1.RouterModule.forRoot([
                    { path: '', component: login_component_1.LoginComponent },
                    { path: 'login', component: login_component_1.LoginComponent },
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: 'chat/:name', component: chat_component_1.ChatComponent }
                ], {
                    useHash: true
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                chat_component_1.ChatComponent,
                friend_component_1.FriendComponent,
                nachricht_component_1.NachrichtComponent
            ],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map