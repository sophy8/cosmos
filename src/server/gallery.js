var express = require('express');
var router = express.Router();
Gallery = require('./models/gallery');

/* GET home page. */
router.get('/', function (req, res, next) {
    Gallery.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    })
});
router.post('/', function (req, res, next) {
    // Gallery.create(req.body, function (err, post) {
    //   if (err) return next(err);
    //   else
    Gallery.find((err, issues) => {
        if (err)
            console.log(err);
        else
            console.log(req.body);
        console.log(issues);
        let item = [];
        let arr = [];
        issues.forEach(element => {
            element.multicity = false;
            if (req.body.return === "Multicity") {
                if (element.from === req.body.from && element.to === req.body.to || element.to === req.body.from && element.from === req.body.to) {
                    element.multicity = true;
                    element.save(function (err) {
                        if (err) {
                            console.log('ERROR!');
                        }
                    });
                    item.push(element);
                }                    
            } else {
                if (element.from === req.body.from && element.to === req.body.to) {
                    item.push(element);
                }
            }
        });
        // arr.push(item)
        // res.json(arr);
        res.json(item);
        })
});

module.exports = router;