import {Component, OnInit} from '@angular/core';
import { resolve } from 'url';
import { Token } from '@angular/compiler';


@Component({
    selector: "my-home",
    template: `
            <div *ngFor="let friend of bestFreinds">
                <my-friend name="{{friend}}"></my-friend>
            </div>  
                     
                
            `
    
})
export class HomeComponent implements OnInit {

    //Datenbankzugriff
    bestFreinds=[
        "Fabian",
        "Andreas",
        "Julia",
        "Florian",
        "Lisa"
    ]

    //Ziel: Liste wie oben durch http request abhängig von user erhalten 

    //Still not working - 401-unauthorized
    
    //This function is executed when page /home is loaded
    ngOnInit(){     
        //Copy from Postman 
        let data = JSON.stringify(false);//glaub unnötig

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=() => {
            if (xhttp.readyState === 4) {
                if(xhttp.status==200){//Response erhalten
                    console.log("!! Response freunde!! ");
                    console.log(xhttp.responseText);           
            
                } else if (xhttp.status === 400) alert("Error occured!");
                else if (xhttp.status === 401) alert("Login failed!");
            }
        };

        xhttp.open("GET", "http://localhost:3000/friends/test0");
        xhttp.setRequestHeader("Content-Type", "application/json");
       // xhttp.setRequestHeader("Authorization", "TOKEN !!!??");//TOKEN FROM LOGIN 
        xhttp.setRequestHeader("cache-control", "no-cache");
        xhttp.setRequestHeader("Authorization", "d679bb8b6cef80ddb7b376bf2799d8f3b1ceb49e27c8bd4b4c968d74d7df4bf294847252fd425afdcc2c03e6b772f9fe1682f97250ddcdc52da76b1805992fd57c93895944657bfabc022bf7571e598227da16eec10a663dbf7339c1793862feb3abadfe6630de558323d920d7983fbf1893427112b65142ca04ce5ed0fc80a9a90d7c033ff9a9ee4e8b2d93fd68243693dd4ccb61568ce8df636b00a516b5ee5582c774159c1fa9a8b1db50d7b24eda1db037213b9052d858fb4dd172eac596f25a6");



        //Nächster Versuch: Body mithilfe von Fabians Test Datei korrikieren 
        xhttp.send(JSON.stringify({name:"test0", token:"d679bb8b6cef80ddb7b376bf2799d8f3b1ceb49e27c8bd4b4c968d74d7df4bf294847252fd425afdcc2c03e6b772f9fe1682f97250ddcdc52da76b1805992fd57c93895944657bfabc022bf7571e598227da16eec10a663dbf7339c1793862feb3abadfe6630de558323d920d7983fbf1893427112b65142ca04ce5ed0fc80a9a90d7c033ff9a9ee4e8b2d93fd68243693dd4ccb61568ce8df636b00a516b5ee5582c774159c1fa9a8b1db50d7b24eda1db037213b9052d858fb4dd172eac596f25a6"}));
    }

}