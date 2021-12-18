require('dotenv').config();

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

app.post('/Url', async (req, res) => {
    await ShortUrl.create({ longUrl: req.body.Url })
    
    res.render('index',{
        shortURL: shortUrl
    })
  })
  
  app.get('/:Url', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
  

//Connect to database
connectDB();


app.use(express.json({extented: false}));

//Define routes
app.use('/',require('./routes/app'));
app.use('/api/url', require('./routes/url'));


app.listen(port, function(){
    console.log('Server started on port '+port);
});

