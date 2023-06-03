import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/profile', (req, res) => {
    res.send("Profile page!")
})

app.listen(8000);