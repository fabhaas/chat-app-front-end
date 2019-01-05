import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: "my-chat",
    template: `
    

                <div style="background-color: #3366ff; margin: 2%;
                            border-radius: 3px; text-align: left;">
                    <input type="button" value="<" 
                            onClick="history.go(-1);return true;"
                            style="background-color: #3399ff;">

                    <div style=" display: inline;text-align: center; width: 80%;">
                        <strong>{{name}}</strong>
                        </div>
                </div>

                <div style="height">
                </div>

                <div>
                <my-nachricht></my-nachricht>
                </div>

                <div style="height: 70%; background-color:#b3b6bc; margin: 2%; ">
                <p>Space fir Chat messages</p>
                </div>

                <div style="margin: 2%;">
                <input 
                    type="text" 
                    
                    id="newMessage" 
                    placeholder="Write a Message..." 
                    style="display: inline;
                            width: 80%;
                            font-size: 14px;
                    "
                >
                <button 
                    class="btn btn-primary" 
                    (click)="send()"
                        
                >Send</button>
                </div>
               
            

                
            `,
    styles: [`
        b:hover {
            color: yellow;
        }
    
    `]
    
    
})
export class ChatComponent {

    private route: ActivatedRoute; 

    name: string; 

    constructor(route: ActivatedRoute){
        this.route=route;
    }

    ngOnInit(){
        this.name=this.route.snapshot.params["name"];
    }



}