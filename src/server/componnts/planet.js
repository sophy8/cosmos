var express = require('express');
var router = express.Router();
Planet = require('../models/allplanet.js');

router.get('/',function(req, res,next){
            Planet.find((err, issues) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(issues);
                })
            }
            )
router.post('/', function(req, res, next) {
                Planet.create(req.body, function (err, post) {
                  if (err) return next(err);
                  res.json(post);
                });
              });
module.exports = router;