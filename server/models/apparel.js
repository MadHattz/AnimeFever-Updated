let mongoose = require('mongoose');
// create a Apperal model
let apparelTrain = mongoose.Schema({
    name: String,
    price: String,
    description: String,
    size: String
    },
    {
        collection: "apparels"
    }
);

/* Schema for the database */
module.exports = mongoose.model('apparels', apparelTrain);

