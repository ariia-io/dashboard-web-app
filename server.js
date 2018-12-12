var express = require("express");  
var path = require("path");   
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var redisClient  = redis.createClient('6379', '192.168.0.102');

var app = express();  
var port = process.env.port || 8080;  
var srcpath  =path.join(__dirname,'/public') ;  

app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'})); 

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: '192.168.0.102', port: 6379, client: redisClient,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

//  default to index.html page  
app.get("*",function(req,res){   
    req.session.tenant_slug = "ablv2";
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(port,function(){   
    console.log("ariia web server listening on port "+ port);  
})  

