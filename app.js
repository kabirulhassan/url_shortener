require('dotenv').config();
const dummyURLs = 
[{
    longUrl: 'https://www.google.com',
    shortUrl: 'https://www.google.com',
    clicks: 0
},
{
    longUrl: 'https://www.facebook.com',
    shortUrl: 'https://www.facebook.com',
    clicks: 0
},
{
    longUrl: 'https://www.youtube.com',
    shortUrl: 'https://www.youtube.com',
    clicks: 0
}];
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const connectDB = require('./config/db');
const ShortUrl = require('./models/Url')

const app = express();

mongoose.connect('mongodb+srv://Diyasini:Riya%40123@cluster0.esnm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const port = process.env.PORT||3000;

const shortURL= 'curt/rf23rf24y';
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index',{
        shortURL: shortURL,
        hidden: shortURL? "" : "hidden"
    });
});

app.get("/analytics", (req, res) => {
    res.render(
        'analytics',{
            urls: dummyURLs
        });
    });

//Connect to database
connectDB();


app.use(express.json({extented: false}));

//Define routes
app.use('/',require('./routes/app'));
app.use('/api/url', require('./routes/url'));


app.listen(port, function(){
    console.log('Server started on port '+port);
});

