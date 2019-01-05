import {Component, Input} from '@angular/core';

@Component({
    selector: "my-friend",
    template: `<div style="background-color: #819FF7; 
                margin: 2%; text-align: center; 
                border-radius: 3px; font-size: 2em;"
                routerLink="/chat/{{name}}"> 
                 {{name}}
                </div> 
                
            `
    
})
export class FriendComponent {
    @Input() name: string
}