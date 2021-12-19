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
const ShortUrl = require('./models/Url');
const con = require('config');
const router = express.Router();

const app = express();

mongoose.connect('mongodb+srv://Diyasini:Riya%40123@cluster0.esnm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const port = process.env.PORT||3000;

// const shortURL= 'curt/rf23rf24y';
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(auth(config)); // auth router attaches /login, /logout, and /callback routes to the baseURL



app.get("/", async (req, res) => {
    

    res.render('index',{
        isSignedIn: req.oidc.isAuthenticated(),
        shortURL: "",
        hidden: "hidden"
    });
    if(req.oidc.isAuthenticated())
        console.log(req.oidc.user.sub);
});
app.get("/analytics", (req, res) => {
  ShortUrl.find({}, (err, urls) => {
    if (err) {
      console.log(err);
    } else {
        const baseUrl = process.env.BASEURL;
        urls.forEach(url => {
            url.shortUrl=baseUrl+'/'+url.shortUrl;
        });
      res.render("analytics", {
        isSignedIn: req.oidc.isAuthenticated(),
        urls: urls,
      });
    }
  });
});

app.post('/shortUrls', async (req, res) => {
    const longUrl = req.body.fullUrl;
    const baseUrl = process.env.BASEURL;

    await ShortUrl.create({ longUrl: longUrl });
    const foundUrlObject = await ShortUrl.findOne({ longUrl: longUrl });
    // console.log(foundUrlObject);
    const foundShortUrl = foundUrlObject.shortUrl;
    console.log(foundShortUrl);
    res.render('index',{
        isSignedIn: req.oidc.isAuthenticated(),
        shortURL: baseUrl + "/" + foundShortUrl,
        hidden: foundShortUrl? "" : "hidden"
    });


    // res.redirect('/')
    
  })
  
  app.get('/:short', async (req, res) => {
    const short = await ShortUrl.findOne({ shortUrl: req.params.short})
    if (short == null) return res.sendStatus(404)
  
    
    short.clicks++
    short.save()
  
    res.redirect(short.longUrl)
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
