//let foods = require('../models/food');
let Staff = require('../models/staff');
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

    Staff.find(function(err, staffs) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(staffs,null,5));
    });
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Staff.find({ "_id" : req.params.id },function(err, staff) {
        if (err)
            res.json({ message: 'Staff NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(staff,null,5));
    });
}
router.addStaff = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var staff = new Staff();

    staff.name = req.body.name;
    staff.gender = req.body.gender;
    staff.position = req.body.position;
    staff.number = req.body.number;
    staff.upvotes=req.body.upvotes;

    staff.save(function(err) {
        if (err)
            res.json({ message: 'Staff NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Staff Added!', data: staff });
    });
}
function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}
router.incrementUpvotes = (req, res) => {

    Staff.findById(req.params.id, function(err,staff) {
        if (err)
            res.json({ message: 'Staff NOT Found!', errmsg : err } );
        else {
            staff.upvotes += 1;
            staff.save(function (err) {
                if (err)
                    res.json({ message: 'Staff NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Staff Successfully Upvoted!', data: staff });
            });
        }
    });
}
router.deleteStaff = (req, res) => {

    Staff.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Staff NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Staff Successfully Deleted!'});
    });
}
module.exports = router;
