# URL Shortener
THis project is currently hosted in beta and hosted at : https://walkover-project.herokuapp.com/
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
  
Analytics Page
  https://share.balsamiq.com/c/ozrZ9CXpcgkBYzNLoUXSKW.png
  ![ozrZ9CXpcgkBYzNLoUXSKW](https://user-images.githubusercontent.com/90218870/146599792-5855f68d-1d33-4a33-9fad-ccd77ec683cc.png)


# Design
Colour Palette

   #ffcd57
   white
   #ffcd57
   black
   #ddd
   
   
   
# Routes
1. /-> Landing Page
2. /index -> Redirect Long Url to Short Url
3. /url -> Create short Url

# Schema
URL SCHEMA
   
    urlCode: String
    
    longUrl: String
    
    shortUrl: String
    
    date: { type:String, default: Date.now}
    
 SHORTURL SCHEMA
 
  full:  
       
    type: String
    
    required: true
  
  short: 
  
    type: String
    
    required: true
    
    default: shortId.generate
  
  clicks: 
  
    type: Number
    
    required: true
    
    default: 0
    
    
# API

Prefix: /request/api.http

Endpoints:

 get
 
 post

# UI

Prefix: /views/index 

Endpoints:

  set
  
  use
  
  post
  
  get

# MVP Feature


1. Convert long URL into short Url
2. User can sign up using Auth()
3. User can see the links that are converted
4. User can track the activity of the click by the number if Clicks



