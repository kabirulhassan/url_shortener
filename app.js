require('dotenv').config(); //getting env variables

const { auth } = require('express-openid-connect'); //openid connect for auth0
//configuration for auth0
const baseUrl = process.env.BASEURL || "https://walkover-project.herokuapp.com";
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: baseUrl,
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
const UAParser = require('ua-parser-js');

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
  if(!req.oidc.isAuthenticated()){
    // alert("Please login to view analytics");
    res.redirect('/login');
  }
  ShortUrl.find({Userid: req.oidc.user.sub}, (err, urls) => {
    if (err) {
      console.log(err);
    } else {
        // const baseUrl = process.env.BASEURL;
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
    const userId = req.oidc.isAuthenticated() ? req.oidc.user.sub : "public";

    if(await ShortUrl.findOne({ longUrl: longUrl, Userid: userId }) === null){
      await ShortUrl.create({ longUrl: longUrl, Userid: userId });
      console.log("new url created");
    }
    const foundUrlObject = await ShortUrl.findOne({ longUrl: longUrl, Userid: userId });
    const foundShortUrl = await foundUrlObject.shortUrl;
    console.log(foundShortUrl);
    res.render('index',{
        isSignedIn: req.oidc.isAuthenticated(),
        shortURL: baseUrl + "/" + foundShortUrl,
        hidden: foundShortUrl? "" : "hidden"
    });


    
  })
  
  app.get('/:short', async (req, res) => {
    const short = await ShortUrl.findOne({ shortUrl: req.params.short})
    if (short == null) return res.sendStatus(404)
    const parser = new UAParser();
    const ua = req.headers['user-agent'];
    const browserName = parser.setUA(ua).getBrowser().name;
    console.log(browserName);
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


