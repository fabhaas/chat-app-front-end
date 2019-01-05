import {Component} from '@angular/core';

@Component({
    selector: "my-home",
    template: `
            <div *ngFor="let friend of bestFreinds">
                <my-friend name="{{friend}}"></my-friend>
            </div>  
                     
                
            `
    
})
export class HomeComponent {

    //Datenbankzugriff
    bestFreinds=[
        "Fabian",
        "Andreas",
        "Julia",
        "Florian",
        "Lisa"
    ]

}