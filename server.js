const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require("body-parser");
const md5 = require("md5");

const app = express();

app.use(helmet());

const protectedRoute = (req, res, next) => {
    if (req.session.key == null) {
        res.json("NOT_CONNECTED");
    }
    else {
        next();
    }
}

app.set('trust proxy', 1);
app.use(session({
  secret: 'chat-cl-of-web',
  resave: false,
  sameSite: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.static('client'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const BASE_API_URL = "https://apps-de-cours.com/web-chat/server/api/";

const callAPI = (serviceName, req, res, data = null) => {
    axios.post(BASE_API_URL + serviceName, data)
    .then((response) => {                   
        if (response.data == "NOT_CONNECTED" || response.data == "USER_IS_BANNED") {
            req.session.key = null;
            res.json(response.data);
        }
        else if (serviceName == "login" && response.data.length == 32) {            
            req.session.key = response.data;
            res.json("SIGNED_IN");
        }
        else {
            res.json(response.data);
        }
    })
    .catch((error) => {
        res.json(error);
    });
}

app.post('/api/signin', (req, res) => {    
    var params = new URLSearchParams();
    params.append('username', req.body.username);
    params.append('password', md5(req.body.password));

    callAPI("login", req, res, params);
});

app.post('/api/register', (req, res) => {
    var params = new URLSearchParams();
    params.append('no', req.body.no);
    params.append('firstName', req.body.firstName);
    params.append('lastName', req.body.lastName);
    params.append('username', req.body.username);
    params.append('welcomeText', req.body.welcomeText);
    params.append('password', md5(req.body.password));

    callAPI("register", req, res, params);
});

app.post('/api/signout', protectedRoute, (req, res) => {
    var params = new URLSearchParams();    
    params.append('key', req.session.key);

    callAPI("logout", req, res, params);
});

app.post('/api/latest-messages', protectedRoute, (req, res) => {
    var params = new URLSearchParams();    
    params.append('key', req.session.key);

    callAPI("read-messages", req, res, params);
 });

app.post('/api/active-members', protectedRoute, (req, res) => {
    var params = new URLSearchParams();    
    params.append('key', req.session.key);

    callAPI("read-members", req, res, params);
 });

 app.post('/api/write-message', protectedRoute, (req, res) => {
    var params = new URLSearchParams();    
    params.append('key', req.session.key);
    params.append('message', req.body.message);

    callAPI("write-message", req, res, params);
 });

const server = app.listen(3000, () => {
    console.log("Server ready : http://localhost:3000");    
});