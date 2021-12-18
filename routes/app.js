const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@route GET /:code
//@desc  Redirect to long/original URL
router.get('/:code',async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code});


        if(url){
            return res.redirect(url.longUrl);
        }
        else
        {
            return res.status(404).json('No url found');

        }
    }
    catch(err)
    {
      console.error(err);
      res.status(500).json('Server error');
    }
})

module.exports = router;
