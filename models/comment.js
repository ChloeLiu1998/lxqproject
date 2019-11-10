let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
        title: String,
        content: String,
    },
    { collection: 'comments' });

module.exports = mongoose.model('Comment', CommentSchema);