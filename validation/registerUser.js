const validate = require('validator');
const isEmpty = require('is-empty');

const registerUserValidation = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (isEmpty(data.firstName)) {
    errors.firstName = 'Please enter your first name';
  }

  if (isEmpty(data.lastName)) {
    errors.lastName = 'Please enter your last name';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Please enter an email address';
  } else if (!validate.isEmail(data.email)) {
    errors.email = 'Email address is not valid';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Please enter a password';
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please enter a password';
  } else if (!validate.equals(data.confirmPassword, password)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = registerUserValidation;
