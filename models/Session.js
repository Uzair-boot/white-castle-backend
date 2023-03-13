const mongoose = require('mongoose');
const FKHelper = require('./helpers/foreign-key-helper');
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        isAsync: true,
        validator: function (v) {
          return FKHelper(mongoose.model('User'), v);
        },
        message: `User doesn't exist`,
      },
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Session', SessionSchema);
