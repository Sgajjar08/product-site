const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    product_name: {
        type: String
    },
    date: {
        type: String
    },
    inventory_level: {
        type: Number
    }
});

module.exports = mongoose.model('Product', Product);