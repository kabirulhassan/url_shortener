require('dotenv').config(); //getting env variables

const { auth } = require('express-openid-connect'); //openid connect for auth0
//configuration for auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
  };

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

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index',{
        shortURL: shortUrls,
        hidden: shortURL? "" : "hidden"
    });
});
app.get("/analytics", (req, res) => {
    res.render(
        'analytics',{
            urls: dummyURLs
        });
    });

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ longUrl: req.body.fullUrl })
    
    res.redirect('/')
  })
  
  app.get('/:Url', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(Url.longUrl)
  })
  
//Connect to database
//Connect to database
connectDB();


app.use(express.json({extented: false}));

//Define routes
app.use('/',require('./routes/app'));
app.use('/api/url', require('./routes/url'));


app.listen(port, function(){
    console.log('Server started on port '+port);
});

app.use(auth(config)); // auth router attaches /login, /logout, and /callback routes to the baseURL