const mongoose = require('mongoose');

// module.exports = {
//  MongoURI: 'mongodb+srv://<>:<Franklin12@@>@cluster0.yxshb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// }

mongoose.connect('mongodb://localhost/tcteam' )
.then(() => console.log(   'Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))