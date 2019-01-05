var express = require("express")
var app=express()
var path=require("path")

const hostname = '127.0.0.1'; //=Localhost
const port = 3010;

//Statische Dateien für Polifills ausliefern
var nodeModulesPath=path.join(__dirname, "..","node_modules");
app.use("/node_modules", express.static(nodeModulesPath)); //static express middleware 

//Ermöglicht Zugriff auf systemjs.config.js
var clientPath=path.join(__dirname, "..","client");
app.use("/client", express.static(clientPath)); //static express middleware 



//Seiten zu URL verlinken 

app.get("/",function(req, res) {
    res.sendFile(__dirname+"/views/index.html")
})





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


