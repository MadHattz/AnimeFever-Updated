let mongoose = require('mongoose');
// create a Apperal model
let wishTrain = mongoose.Schema({
    name: String,
    price: String,
    description: String,
    size: String
    },
    {
        collection: "wishs"
    }
);

/* Schema for the database */
module.exports = mongoose.model('wishs', wishTrain);

