const express = require("express");
const { createHash } = require('node:crypto');
const ai = require("./summariser.js")
const util = require("./util/util.js")
require("dotenv").config()
const app = express();
const multer  = require('multer');
const fs = require("fs");
const { Poppler } = require("node-poppler");
const upload = multer({ dest: '../uploads/' })
/* Template JSON request
Request that needs authentication:
Headers:
Authorization: Bearer (insert TOTP)
Timestamp: (UNIX timestamp)
User: Session token
Body:
{
    (insert data)
}
Request that doesnt need authentication:
Headers:
Body:
{
    (insert data)
}
*/
//nonAuthPaths are for endpoints that do not require authentication. Put your endpoint here if needed
const nonAuthPaths = ["/", "/profile", "/playground.html"]

app.use(function(req, res, next) {
    
    //REMOVE ALL RES.HEADER before pushing to prod!
    res.header("Access-Control-Allow-origin", "*")
    res.setHeader('Access-Control-Allow-Methods', "GET, POST")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //console.log(req.originalURL)
    if(!nonAuthPaths.includes(req.originalUrl)){
        //Get TOTP from header
        
        var reqToken = req.get("authorization")
        console.log(reqToken)
        if(reqToken != undefined){
            reqToken = reqToken.substring(7)
             //Get current timestamp
            var currentTime = Date.now()
            //Dividing by 30 because each TOTP is valid for 30sec
            //Generate another token timestamp in case the previous token was in the previous block of time
            //(so technically each TOTP is valid for 60sec but shouldnt affect security much)
            var tokenTimestamps = [currentTime / 30000, currentTime / 30000 - 1];
            //TODO: grab user session token from MongoDB
            var userSessionToken = "hehehehaw"; 
            //if any of the generated tokens match the generated TOTP
            for(var x of tokenTimestamps){
                //console.log("generated" + util.generateTOTP(userSessionToken, x))
                //console.log(reqToken)
                if(reqToken==util.generateTOTP(userSessionToken, x)){
                    
                    next()
                    
                    return false;
                }
            }
            
            for(var x of tokenTimestamps){
                //console.log("generated" + util.generateTOTP(userSessionToken, x))
                //console.log(reqToken)
                console.log(util.generateTOTP(userSessionToken, x))
                    
            }
            res.status(401).send({message: "Invalid Token"})
        } else {
            res.status(404).send()
        }
       

        
    } else {
        next()
    }
    
})
app.get('/', (req, res) => {
    res.send("Hello World!")
})
app.get('/playground.html', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en" ng-app="APP">
    <head>
        <meta charset="UTF-8">
        <title>angular file upload</title>
    </head>
    
    <body>
            <form method='post' action='/api/summarise' enctype="multipart/form-data">
            <input type='file' name='fileUploaded'>
            <input type='submit'>
     </body>
    </html>`)
})
app.get('/profile', (req, res) => {
    res.send("Profile page!")
})
app.post('/api/summarise', express.json({limit: '50mb'}), (req, res) => {
    
    console.log(req.body.file)
    fs.writeFileSync(`../uploads/pdf${req.get("authorization")}${Date.now()}`, Buffer.from(req.body.file.data))

    //TODO: 1. send data to ocr.py via child_process 2. relay data to summariser.js
    res.send({message: "Success!"})
    //Part 2: Summariser, assuming above ocr.py is done
    var output = "";
    
    /*ai.summarise(output, 50, process.env.CHATGPT_TOKEN)
    .then((summary) => {
        res.send({summary: summary})
    })*/
    
})

app.listen(8000);