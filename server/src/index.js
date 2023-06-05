const express = require("express")
const { createHash } = require('node:crypto')
const ai = require("./summariser.js")
const util = require("./util/util.js")
const app = express()
const pdf2img = require('pdf-img-convert')
const fs = require("fs")
const cors = require("cors")
const { PythonShell } = require("python-shell")
const mongoose = require('mongoose')
const User = require("./schemas/User.js")
require("dotenv").config()

// TODO: Put URI into Azure secret
mongoose.connect("mongodb+srv://jowiaoun:P1P35aMP2S2PhUOm@cluster0.juovemx.mongodb.net/")

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
const nonAuthPaths = ["/", "/profile", "/playground.html", "/register"]

// --- Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(function(req, res, next) {
    
    //TODO: REMOVE ALL RES.HEADER before pushing to prod!
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

app.get('/profile', (req, res) => {
    res.send("Profile page!")
})

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in the database
      const user = await User.findOne({ username, password }).exec();
  
      if (!user) {
        res.status(401).send('Invalid username or password');
      } else {
        res.send('Login successful');
      }
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).send('Internal Server Error');
    }
});
  
// Signup endpoint
app.post('/api/signup', async (req, res) => {

    const { username, password } = req.body;
    
    try {
      // Create a new user
      const newUser = new User({ username, password });
  
      // Save the user to the database
      await newUser.save();
  
      res.send('Signup successful');
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
});
  
app.post('/api/summarise', express.json({limit: '50mb'}), (req, res) => {
    
    console.log(req.body.file)
    pdf2img.convert(Buffer.from(req.body.file.data)).then((imgarr) => {
        //imgarr is an array of png images in UInt8Arr format
        for(img of imgarr){
            var path = `../uploads/${req.get("authorization")}${Math.floor(Math.random * 100000)}.png`;
            fs.writeFileSync(path, new Buffer(imgarr[0].buffer))
            var pyshellOptions = {
                pythonPath: "python3",
                scriptPath: "./",
                args: [`"../uploads/${path}"`]
            }
            PythonShell.run("ocr.py", pyshellOptions, (err, result) => {
                if(err) {
                    console.error(err)
                } else {
                    var output = result[0]
                    console.log(output)
                }
            })
        }

        

    })

    res.send({message: "Success!"})
    //Part 2: Summariser, assuming above ocr.py is done
    var output = "";
    
    /*ai.summarise(output, 50, process.env.CHATGPT_TOKEN)
    .then((summary) => {
        res.send({summary: summary})
    })*/
    
})

app.listen(process.env.PORT || 80);