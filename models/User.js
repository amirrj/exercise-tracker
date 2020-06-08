const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: {
    type: Array,
    default: [],
    required: true,
  },
  followers: {
    type: Array,
    default: [],
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
