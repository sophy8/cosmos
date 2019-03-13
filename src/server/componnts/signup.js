var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
Signup = require('../models/signup.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res, next) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Signup.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    },
         function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.");
      var token = jwt.sign({ id: user._id },'supersecret', {
        expiresIn: 86400 // expires in 24 hours
      });
     // res.status(200).send({ auth: true, token: token });
      res.setHeader('Authorization', 'Bearer '+ token); 
      res.status(200).send({ auth: true, token: token });
    });
  });

module.exports = router;