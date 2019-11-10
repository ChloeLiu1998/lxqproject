let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
        name: String,
        price: Number,
        upvotes:Number
    },
    { collection: 'foods' });

module.exports = mongoose.model('Food', FoodSchema);