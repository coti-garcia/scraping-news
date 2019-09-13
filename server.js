const express = require("express");
const exphbs  = require('express-handlebars');
const path = require("path")
const axios = require("axios")
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const db = require("./models")
mongoose.connect('mongodb://localhost/scrapingrNews', { useUnifiedTopology: true });
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', exphbs( {defaultLayout: "main"} ));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home', {title: 'Scraping News'});
});

app.get("/saved", function(req,res){
    res.render('saved', {title: 'Saved News'});
})

app.get("/scraper", function(req,res){
    axios.get("https://www.npr.org/sections/news/")
    .then( response => {
        const $ = cheerio.load(response.data)
        let news =[]
        $(".item").each(function(i,element){
            let item = {
                title : $(element).find(".title a").text(),
                section: $(element).find(".slug a").text(),
                body : $(element).find(".teaser a").text()
            } 
            db.Article.create(item).then(function(doc){
                console.log(item);
            })
        }).then(function(){
            res.send("Scraper Complete");
        })
    })
    .catch(function(err) {
        res.json({ msg: err });;
    });
})

app.get("/articles", function(req,res){
    db.Article.find({}).then(function(doc){
        res.json(doc)
    }).catch(function(err) {
        res.json({ msg: err });;
    });
})

app.get("/deleteAll", function(req,res){
    db.Article.deleteMany({}).then(function(doc){
        res.json(doc)
    }).catch(function(err) {
        res.json({ msg: err });;
    });
})


app.listen( PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`)
})