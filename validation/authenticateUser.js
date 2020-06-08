const validate = require('validator');
const isEmpty = require('is-empty');

const authenticateUserValidation = (data) => {
  const errors = {};

  data.email = data.email ? data.email : '';
  data.password = data.password ? data.password : '';

  if (isEmpty(data.email)) {
    errors.email = 'Please enter an email address';
  } else if (!validate.isEmail(data.email)) {
    errors.email = 'Email address is not valid';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Please enter a password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = authenticateUserValidation;
