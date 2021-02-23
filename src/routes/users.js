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
    if(!Firstname || !Lastname || !email || !password || !role){
        errors.push({msg: 'Please fill in all fields'});
    }

  

    if ((password &&  password.length)< 8) {
        error.password = "too short";
      }

    if(errors.length > 0) {
      return  res.json({
           errors,
           

       });
        
    } else{
        
    // Validation passed
        User.findOne({ email: email })
        .then(user =>{
            if(user){
                // User exists
                errors.push({msg: 'Email is already registered'});
             return   res.json({
                    errors,
                   
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
                           
                           return res.json(user);
                        })
                        .catch(err => console.log(err));
                    })
                })

            }
        });
    }

});


module.exports = router;