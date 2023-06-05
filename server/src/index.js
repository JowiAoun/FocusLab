const express = require("express");
const { createHash } = require('node:crypto');
const ai = require("./summariser.js")
const util = require("./util/util.js")
require("dotenv").config()
const app = express();
//const pdf2img = require('pdf-img-convert');
const fs = require("fs");
//const { PythonShell } = require("python-shell")
const PDFDocument = require('pdf-lib').PDFDocument;
const { ocrSpace } = require("ocr-space-api-wrapper")
const { exec } = require('node:child_process');
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
    
   //fs.writeFileSync("../uploads/test.pdf", Buffer.from(req.body.file.data))
    /*pdf2img.convert(Buffer.from(req.body.file.data)).then((imgarr) => {
        //imgarr is an array of png images in UInt8Arr format
        for(img of imgarr){
            var path = `../uploads/${req.get("authorization")}${Math.floor(Math.random() * 100000)}.png`;
            fs.writeFile(path, img, () => {
                var pyshellOptions = {
                    pythonPath: "python3",
                    scriptPath: "./",
                    args: [`"${path}"`]
                }
                setTimeout(() => {
                   
                    var shell = new PythonShell("ocr.py", pyshellOptions)
                    
                    shell.run("ocr.py", pyshellOptions, (err, result) => {
                        if(err) {
                            console.error(err)
                        } else {
                            var output = result[0]
                            console.log(output)
                        }
                    })
                    shell.on('message', function (message) {
                        // received a message sent from the Python script (a simple "print" statement)
                        console.log(message);
                      });
                    
                }, 300)
            })
            
        }

        

    })*/
    splitPdf(Buffer.from(req.body.file.data), req).then((dataArr) => {
        var rand = dataArr[1]
        var pathArr = dataArr[0]
        var output = "";
        console.log("here")
        function recurse(x){
            return new Promise((resolve, reject)=> {
                
                if(x < pathArr.length){
                    
                    var newPath = pathArr[x].substring(0, pathArr[x].length - 6) + "c" + pathArr[x].substring(pathArr[x].length - 6)
                    exec(`./shrink.sh -o "${newPath}" -r 90 "${pathArr[x]}"`, (error, stdout, stderr) => {
                        if (error) {
                          console.error(`exec error: ${error}`);
                          return;
                        } else {
                            ocrSpace(newPath, {apiKey: "31df78a8b388957"}).then((result) => {
                                console.log(result)
                                output += result.ParsedResults[0].ParsedText;
                                recurse(x+1).then(p => resolve(p))
                            })
                            .catch(e => reject(e))
                        }
                        console.log(`stdout: ${stdout}`);
                        console.error(`stderr: ${stderr}`);
                      });
                    
                } else {
                    resolve(output)
                }
            })
            
            
        }
        recurse(0).then((output) => {
            fs.rmdirSync(`../uploads/${req.get("authorization")}${rand}/`, {recursive: true})
            console.log(output)
            ai.summary(output, req.body.wordCount, process.env.CHATGPT_KEY)
                    .then((summary) => {
                        console.log(summary)
                        res.send({summary: summary})
                    })
                    .catch((e) => {console.log(e) 
                        res.statusCode(500).send({"error": "OCR software was unable to scan the pdf. Try uploading a smalled pdf (less than 20mb)"})
                    })
                
        })
        .catch((e) => {console.log(e) 
            res.sendStatus(500)
        })
        
    })
    .catch((e) => {console.log(e) 
        res.sendStatus(500)
    })


   /* var path = `../uploads/${req.get("authorization")}${Math.floor(Math.random() * 100000)}.pdf`;
    var newPath = `../uploads/${req.get("authorization")}${Math.floor(Math.random() * 100000)}c.pdf`;
    fs.writeFile(path, Buffer.from(req.body.file.data), () => {
        console.log("Written")
    
        exec(`./shrink.sh -o "${newPath}" -r 90 "${path}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            } else {
                ocrSpace(newPath, {apiKey: "31df78a8b388957"}).then((result) => {
                console.log(result)
                    ai.summarise(output, req.body.wordCount, process.env.CHATGPT_TOKEN)
                    .then((summary) => {
                        res.send({summary: summary})
                    })
                })
                .catch(e => console.log(e))
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    })*/
    //res.send({message: "Success!"})
    //Part 2: Summariser, assuming above ocr.py is done
    
    
    
})

async function splitPdf(documentAsBytes, req) {


    // Load your PDFDocument
    var pdfDoc = await PDFDocument.load(documentAsBytes)

    var numberOfPages = pdfDoc.getPages().length;
    var x = 0;
    var pathArr = [];
    console.log(numberOfPages)
    var rand = Math.floor(Math.random() * 100000)
    fs.mkdirSync(`../uploads/${req.get("authorization")}${rand}/`)
    while (x < numberOfPages) {
        if(x % 3 == 0){ 
            console.log("here")   
            // Create a new "sub" document
            const subDocument = await PDFDocument.create();
            // copy the page at current index
            var copiedPage = await subDocument.copyPages(pdfDoc, [x])
            subDocument.addPage(copiedPage[0]);
            if(x != numberOfPages - 1){
                
                var copiedPage1 = await subDocument.copyPages(pdfDoc, [x+1])
                subDocument.addPage(copiedPage1[0]);
                if(x != numberOfPages - 2){
                    copiedPage2 = await subDocument.copyPages(pdfDoc, [x+2])
                    subDocument.addPage(copiedPage2[0]);
                    
                }
            }
            
            
            const pdfBytes = await subDocument.save()
            
            var path = `../uploads/${req.get("authorization")}${rand}/${req.get("authorization")}${Math.floor(Math.random() * 100000)}[${x}.pdf`;
           
            fs.writeFileSync(path, pdfBytes);
            
            pathArr.push(path)
            x++;
        } else {
            x++;
            continue
        }
       
        
    }
    return [pathArr, rand];
}
   

//todo change default port back to 80
app.listen(process.env.PORT || 8000);