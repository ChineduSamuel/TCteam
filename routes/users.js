const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");

// User model
const User = require('../models/User')


// Login
router.get('/login', (req, res) => res.send('Login'));

// Register
router.get('/register', (req, res) => res.send('Register'));

// Register Handle
router.post('/register', (req, res) =>{
    const {Firstname, Lastname, email, password, password2, role} = req.body;
    let errors = [];

    // Check required fields
    if(!Firstname || !Lastname || !email || !password || !password2 || !role){
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check password match
    if(password!==password2){
        errors.push({msg: 'Passwords do not match'});
    }
    // Check password length
  

    if (password === "undefined" || password.length < 8) {
        error.password = "too short";
      }

    if(errors.length > 0) {
       res.render('register',{
           errors,
           Firstname,
           Lastname,
           email,
           password,
           password2,
           role

       });
        
    } else{
        
    // Validation passed
        User.findOne({ email: email })
        .then(user =>{
            if(user){
                // User exists
                errors.push({msg: 'Email is already registered'});
                res.render('register',{
                    errors,
                    Firstname,
                    Lastname,
                    email,
                    password,
                    password2,
                    role
                });
            } else{
                const newUser = new User({
                    Firstname,
                    Lastname,
                    email,
                    password,
                    role
                });

                // Hash Password
                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You ahave successfully registered');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    })
                })

            }
        });
    }

});


module.exports = router;