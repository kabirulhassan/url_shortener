const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@route  POST /api/url/shorten
//@desc   Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    

    //check base URL
    if(!validUrl.isUri(baseUrl))
    {
       return res.status(401).json('Invalid base url');

    }

    //create url code
    const urlCode = shortid.generate();

    //Check long Url
    if (validUrl.isUri(longUrl))
    {
        try {
         let url = await Url.findOne({ longUrl });

         if(url)
         {
             res.json(url);
         }
         else{
             const shortUrl = baseUrl + '/' + urlCode;
              url = new Url({
                  
                  shortUrl,
                  urlCode,
                  
              });

              url.clicks++;
              await url.save();
              res.json(url);
            }
        }
        catch(err)
        {
           console.error(err);
           res.status(500).json('Server Error');
        }
    }

    else {
        res.status(401).json('Invalid long Url');
    }

});

module.exports = router;
