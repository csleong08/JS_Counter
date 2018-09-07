var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'liverpool',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

// --------Routes and Locations Below----------
app.get('/', function(request, response) 
{
    if(!request.session.counter)
    {
        request.session.counter = 1;
    }
    else
    {
        request.session.counter +=1;
    }
    response.render('index', {counter: request.session.counter});
});
app.post('/addTwo', function (request, response)
{
    response.send(request.session.counter +=1);
    response.redirect('/');
});
app.post('/reset', function (request, response)
{
    request.session.destroy();
    response.redirect('/');
});
// -----Port Listener------------
app.listen(5000, function() {
  console.log("listening on port 5000");
})
