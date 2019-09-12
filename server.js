const express = require("express")
const path = require("path")
const axios = require("axios")
const mongoose = require('mongoose');
const cheerio = require('cheerio')

mongoose.connect('mongodb://localhost/scrapingrNews', {useNewUrlParser: true});
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get("/scraper", function(req,res){
    axios.get("https://www.washingtonpost.com").then( response => {
        const $ = cheerio.load(response.data)
        const news = [];
        $(".top-table .flex-item").each(function(i,element){
            let item = {
                title : $(element).find(".headline a").text(),
                body : $(element).find(".blurb").text()
            } 
            
            news.push(item);
        })
        console.log(news.length)
        res.json(news);
    })
})

app.get("/saved", function(req,res){
    res.sendFile(path.join(__dirname, "./public/saved.html"))
})

app.listen( PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`)
})