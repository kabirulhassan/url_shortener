const mongoose = require('mongoose');
const shortId = require('shortid')


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
    browser: [
        {
            browserName: String,
          clicks: {
            type: Number,
            default: 1,
          }
        }
    ]
})



module.exports= mongoose.model('Url', urlSchema)