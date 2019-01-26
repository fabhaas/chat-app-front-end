"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        //Datenbankzugriff
        this.bestFreinds = [
            "Fabian",
            "Andreas",
            "Julia",
            "Florian",
            "Lisa"
        ];
    }
    //Ziel: Liste wie oben durch http request abhängig von user erhalten 
    //Still not working - 401-unauthorized
    //This function is executed when page /home is loaded
    HomeComponent.prototype.ngOnInit = function () {
        //Copy from Postman 
        var data = JSON.stringify(false); //glaub unnötig
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                if (xhttp.status == 200) { //Response erhalten
                    console.log("!! Response freunde!! ");
                    console.log(xhttp.responseText);
                }
                else if (xhttp.status === 400)
                    alert("Error occured!");
                else if (xhttp.status === 401)
                    alert("Login failed!");
            }
        };
        xhttp.open("GET", "http://localhost:3000/friends/test0");
        xhttp.setRequestHeader("Content-Type", "application/json");
        // xhttp.setRequestHeader("Authorization", "TOKEN !!!??");//TOKEN FROM LOGIN 
        xhttp.setRequestHeader("cache-control", "no-cache");
        xhttp.setRequestHeader("Authorization", "d679bb8b6cef80ddb7b376bf2799d8f3b1ceb49e27c8bd4b4c968d74d7df4bf294847252fd425afdcc2c03e6b772f9fe1682f97250ddcdc52da76b1805992fd57c93895944657bfabc022bf7571e598227da16eec10a663dbf7339c1793862feb3abadfe6630de558323d920d7983fbf1893427112b65142ca04ce5ed0fc80a9a90d7c033ff9a9ee4e8b2d93fd68243693dd4ccb61568ce8df636b00a516b5ee5582c774159c1fa9a8b1db50d7b24eda1db037213b9052d858fb4dd172eac596f25a6");
        xhttp.send(JSON.stringify({ name: "test0", token: "d679bb8b6cef80ddb7b376bf2799d8f3b1ceb49e27c8bd4b4c968d74d7df4bf294847252fd425afdcc2c03e6b772f9fe1682f97250ddcdc52da76b1805992fd57c93895944657bfabc022bf7571e598227da16eec10a663dbf7339c1793862feb3abadfe6630de558323d920d7983fbf1893427112b65142ca04ce5ed0fc80a9a90d7c033ff9a9ee4e8b2d93fd68243693dd4ccb61568ce8df636b00a516b5ee5582c774159c1fa9a8b1db50d7b24eda1db037213b9052d858fb4dd172eac596f25a6" }));
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "my-home",
            template: "\n            <div *ngFor=\"let friend of bestFreinds\">\n                <my-friend name=\"{{friend}}\"></my-friend>\n            </div>  \n                     \n                \n            "
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map