const express = require('express')
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const csrf = require('csurf');
const csrfProtection = csrf();
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/coffee-app"
const store = new MongoDBStore({
    uri: mongoUri,
    collection: 'mySessions'
});
store.on('connected', function() {
    store.client; // The underlying MongoClient object from the MongoDB driver
});
// Catch errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ['x-auth-token']
}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(morgan("short"));
app.use(session({ 
    secret: "cats",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 //a year why not?
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(csrfProtection);

require("./db/db");
require('./passport/config');
require('./passport/local-config');
require('./passport/google-config');

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');


app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController)

//ERROR HANDLING
app.use(function (err, req, res, next) {
    if (err.code == 'EBADCSRFTOKEN') {
    // handle CSRF token errors here
        console.log(req.body);
        res.status(403)
        res.json({
            data: err
        })
    } else {
        res.json({
            status: 400,
            data: err
        })
    }
})

const port = process.env.PORT || 9000
const server = app.listen(port, ()=>{
    console.log("Server is active")
})