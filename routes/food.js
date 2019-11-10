//let foods = require('../models/food');
let Food = require('../models/food');
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

    Food.find(function(err, foods) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(foods,null,5));
    });
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Food.find({ "_id" : req.params.id },function(err, food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(food,null,5));
    });
}

router.addFood = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var food = new Food();

    food.name = req.body.name;
    food.price = req.body.price;
    food.upvotes=req.body.upvotes;

    food.save(function(err) {
        if (err)
            res.json({ message: 'Food NOT Added!', errmsg : err } );
        else
            res.json({ message: "Food Added!", data: food });
    });
}
function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}
router.incrementUpvotes = (req, res) => {

    Food.findById(req.params.id, function(err,food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else {
            food.upvotes += 1;
            food.save(function (err) {
                if (err)
                    res.json({ message: 'Food NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Food Successfully Upvoted!', data: food });
            });
        }
    });
}
router.deleteFood = (req, res) => {

    Food.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Food NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Food Successfully Deleted!'});
    });
}

module.exports = router;