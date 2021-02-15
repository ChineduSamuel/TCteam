const bodyParser = require("body-parser");
const { Mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
const pino = require("pino")
const flash = require('connect-flash');
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')

const app = express();
app.use(express.urlencoded({ extended: false}))

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secrete',
    resave: true,
    saveUninitialized: true
  
}));

// Connect flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT|| 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));