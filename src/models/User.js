const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minilength: 6,
        select: false
    },
    role: { type: String,
         enum: ['HR', ' Software Engineer',  'Digital Marketer',  'Business analyst', 'CEO',  'CTO', 'Project Manager', 'Accountant'], required: true },

})

const User = mongoose.model('User', UserSchema);
module.exports = User;