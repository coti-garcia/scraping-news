const express = require("express")
const path = require("path")
const axios = require("axios")
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

app.get("/saved", function(req,res){
    res.sendFile(path.join(__dirname, "./public/saved.html"))
})

app.listen( PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`)
})