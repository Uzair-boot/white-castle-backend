const mongoose = require('mongoose');
const foreignKeyHelper = require('./helpers/foreign-key-helper');

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      validate: {
        isAsync: true,
        validator: function (v) {
          return foreignKeyHelper(mongoose.model('Role'), v);
        },
        message: `Role doesn't exist`,
      },
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
