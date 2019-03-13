var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
Signup = require('../models/signup.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res) {
   Signup.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, 'supersecret', {
        expiresIn: 86400 // expires in 24 hours
      });
      res.setHeader('Authorization', 'Bearer '+ token); 
      res.status(200).send({ auth: true, token: token });
    });
  });
  module.exports = router;