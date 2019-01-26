//Dieser Component wird vom Server geladen. In diesem Template soll der HTML Code für die Anwendung stehen 


import {Component} from '@angular/core';


@Component({
    selector: "LetsChat-App",
    template: ` 
                    <div style="text-align: center; max-width: 500px; margin: auto;">
                        <my-header></my-header>

                        <router-outlet></router-outlet> 
                    </div>
                
                `

})

export class AppComponent {

}