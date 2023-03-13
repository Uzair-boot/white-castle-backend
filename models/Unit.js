const mongoose = require('mongoose');
const foreignKeyHelper = require('./helpers/foreign-key-helper');

const UnitSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
      min: 1,
      max: 10,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    baseUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
      validate: {
        isAsync: true,
        validator: function (v) {
          return foreignKeyHelper(mongoose.model('Unit'), v);
        },
        message: `Unit doesn't exist`,
      },
    },
    baseMultiplier: {
      type: Number,
      default: 1,
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Unit', UnitSchema);
