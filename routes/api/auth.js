const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const authenticateUserValidation = require('../../validation/authenticateUser');
const User = require('../../models/User');

// @route POST /api/auth
// @desc authenticate a user
// @access public
router.post('/', (req, res) => {
  const { errors, isValid } = authenticateUserValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = 'User does not exist';
      return res.status(400).json(errors);
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          errors.password = 'Password is incorrect';
          return res.status(400).json(errors);
        }

        jwt.sign(
          { id: user.id },
          config.get('jwt_secret'),
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              token,
              user,
            });
          }
        );
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ msg: 'Something went wrong, please try again' });
      });
  });
});

module.exports = router;
