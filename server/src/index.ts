import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/profile', (req, res) => {
    res.send("Profile page!")
})
app.get('/api/summarise', (req, res) => {
    //TODO: 1. send data to ocr.py via child_process 2. relay data to summariser.js
    res.send("Hello World!")
})
app.listen(8000);