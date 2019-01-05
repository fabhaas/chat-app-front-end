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
var ChatComponent = /** @class */ (function () {
    function ChatComponent(route) {
        this.route = route;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.name = this.route.snapshot.params["name"];
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: "my-chat",
            template: "\n    \n\n                <div style=\"background-color: #3366ff; margin: 2%;\n                            border-radius: 3px; text-align: left;\">\n                    <input type=\"button\" value=\"<\" \n                            onClick=\"history.go(-1);return true;\"\n                            style=\"background-color: #3399ff;\">\n\n                    <div style=\" display: inline;text-align: center; width: 80%;\">\n                        <strong>{{name}}</strong>\n                        </div>\n                </div>\n\n                <div style=\"height\">\n                </div>\n\n                <div>\n                <my-nachricht></my-nachricht>\n                </div>\n\n                <div style=\"height: 70%; background-color:#b3b6bc; margin: 2%; \">\n                <p>Space fir Chat messages</p>\n                </div>\n\n                <div style=\"margin: 2%;\">\n                <input \n                    type=\"text\" \n                    \n                    id=\"newMessage\" \n                    placeholder=\"Write a Message...\" \n                    style=\"display: inline;\n                            width: 80%;\n                            font-size: 14px;\n                    \"\n                >\n                <button \n                    class=\"btn btn-primary\" \n                    (click)=\"send()\"\n                        \n                >Send</button>\n                </div>\n               \n            \n\n                \n            ",
            styles: ["\n        b:hover {\n            color: yellow;\n        }\n    \n    "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map