const mongoose = require('mongoose');
const shortId = require('shortid')

const BrowserSchema = new mongoose.Schema({
    Chrome: Number,
    Firefox: Number,
    Edge: Number,
    Other: Number
})
const urlSchema = new mongoose.Schema({
    UrlCode: String,
    longUrl: String,
    shortUrl:
    {
    type: String,
    default: shortId.generate
    },
    Userid: String,
    clicks: {
        type: Number,
        default: 0
    },
    Browser: [BrowserSchema]
    
})



module.exports= mongoose.model('Url', urlSchema)