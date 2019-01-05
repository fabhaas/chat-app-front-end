import {Component} from '@angular/core';

@Component({
    selector: "my-nachricht",
    template: `
            <div style="background-color: #9ec3ff; 
            margin: 2%; text-align: center; 
            border-radius: 3px; font-size: 2em;">
            {{Nachricht}}
            </div> 
                
            `
    
})
export class NachrichtComponent {

}