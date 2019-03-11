var express = require('express');
var router = express.Router();
Gallery = require('./models/gallery');

/* GET home page. */
router.get('/', function(req, res, next) {
  Gallery.find((err, issues) => {
            if (err)
                console.log(err);
            else
                res.json(issues);})
});
router.post('/', function(req, res, next) {
    // Gallery.create(req.body, function (err, post) {
    //   if (err) return next(err);
    //   else
      Gallery.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);})
    // });
  });
  
module.exports = router;