const bodyParser = require("body-parser")
const { Mongoose } = require("mongoose");
const express = require('express');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
const pino = require("pino")
const flash = require('connect-flash');
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts') 

const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false}))

// DB Config
const db = require('./src/config/db').MongoURI;



// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secrete',
    resave: true,
    saveUninitialized: true
  
}));



// Routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/users'));

const PORT = process.env.PORT|| 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));