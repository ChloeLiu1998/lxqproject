//let foods = require('../models/food');
let Comment = require('../models/comment');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let mongodbUri ='mongodb+srv://lxq:lxq981213@cluster0-szspm.mongodb.net/retaurant?retryWrites=true&w=majority';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Comment.find(function(err, comments) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(comments,null,5));
    });
}
router.addComment = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var comment = new Comment();

    comment.title = req.body.title;
    comment.content = req.body.content;

    comment.save(function(err) {
        if (err)
            res.json({ message: 'Comment NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Comment Added!', data: comment });
    });
}
module.exports = router;