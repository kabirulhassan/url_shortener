require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT||3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index',{
        shortURL: 'curt/rf23rf24y',
    });
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});