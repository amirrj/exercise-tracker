const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const validateRegister = require('../../validation/registerUser');
const User = require('../../models/User');

// @route POST /api/users
// @desc register a new user
// @access public
router.post('/', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(401).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'User already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            res.json({ user });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ msg: 'Could not save user, please try again' });
          });
      });
    });
  });
});
