# URL Shortener
This project is currently hosted in beta and hosted at : https://walkover-project.herokuapp.com/

This tool allows you to convert long urk into short url and track its activity smoothly. 

# Table Of Contents
1. Running Locally
2. TechStack
3. MockUps
4. Design
5. Routes
6. Schema
7. API
8. UI
9. MVP feature

# Running Locally
1. install mongoose, ejs, express,config, shortid, vald-url
2. npm i nodemon
3. npm run dev

# TechStack
1. Ejs
2. json
3. Mongo(Database)
4. AWS/Heroku(hosting)


# Mockups

Landing Page
  https://share.balsamiq.com/c/8SGHcFNAP9D5qWc5BSk87q.png
  ![8SGHcFNAP9D5qWc5BSk87q (1)](https://share.balsamiq.com/c/3zfANeQzckXzYunPGqjpPm.png)
  https://share.balsamiq.com/c/74vtc3a1eUYoL5YLxqHrnd.png 
  ![image](https://user-images.githubusercontent.com/90218870/146903645-1a34cc6e-0f95-4828-a1b1-0aaa7d814695.png)

  
Analytics Page
 https://share.balsamiq.com/c/vafMv4utLSEYdTuwRfAHMD.png
  ![image](https://user-images.githubusercontent.com/90218870/146903751-2fd762ca-e51a-405f-83ed-db224b33dbd7.png)


# Design
Colour Palette

   #ffcd57
   white
   #ffcd57
   black
   #ddd
   
   
   
# Routes
1. /-> Landing Page
2. /app -> Redirect Long Url to Short Url
3. /url -> Create short Url

# Schema
URL SCHEMA
   
    urlCode: String
    
    longUrl: String
    
    shortUrl: String
    
    clicks:{
    type:Number
    default: 0
    }

    
    
# API

Prefix: /request/api.http


 POST http://localhost:3000/api/url/shorten 
Content-Type: application/json

{
"longUrl": "Give the long URL"
}

Response:
HTTP/1.1 200 OK

X-Powered-By: Express

Content-Type: application/json; charset=utf-8

Content-Length: 145

ETag: W/"91-yqcnB4bv2XOjBf78PUwHlEABxC8"

Date: Mon, 20 Dec 2021 10:59:30 GMT
Connection: close

{
  "_id": "61bf4e6484a8d2732b01f0cc",
  
  "longUrl": "Input long URL",
  
  "clicks": No of Clicks,
  
  "shortUrl": "Converted Short URL",
  
  "Browser": [],
  
  "__v": 0
}


# MVP Feature


1. Convert long URL into short Url
2. User can sign up using Auth()
3. User can see the links that are converted in Analatics
4. User can track the activity of the click by the number if Clicks once signed in



