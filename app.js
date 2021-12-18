require('dotenv').config();

const express = require('express');

const app = express();

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
    res.render('analytics');
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});