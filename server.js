const express = require("express");
const exphbs  = require('express-handlebars');
const path = require("path")
const axios = require("axios")
const mongoose = require('mongoose');
const cheerio = require('cheerio');

mongoose.connect('mongodb://localhost/scrapingrNews', { useUnifiedTopology: true });
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', exphbs( {defaultLayout: "main"} ));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.get("/scraper", function(req,res){
    axios.get("https://www.npr.org/sections/news/")
    .then( response => {
        const $ = cheerio.load(response.data)
        const news = [];
        $(".item").each(function(i,element){
            let item = {
                title : $(element).find(".title a").text(),
                section: $(element).find(".slug a").text(),
                body : $(element).find(".teaser a").text()
            } 
            news.push(item);
        })
        console.log(news.length)
        res.json(news);
    })
    .catch(function(error) {
        res.json({ msg: error});;
    });
})

app.get("/saved", function(req,res){
    res.render('saved');
})


app.listen( PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`)
})