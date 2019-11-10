let mongoose = require('mongoose');

let StaffSchema = new mongoose.Schema({
        name: String,
        gender: String,
        position:String,
        number:String,
        upvotes: Number
    },
    { collection: 'staffs' });

module.exports = mongoose.model('Staff', StaffSchema);