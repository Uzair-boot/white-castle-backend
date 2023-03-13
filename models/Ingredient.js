const mongoose = require('mongoose');
const foreignKeyHelper = require('./helpers/foreign-key-helper');

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IngredientCategory',
      validate: {
        isAsync: true,
        validator: function (v) {
          return foreignKeyHelper(mongoose.model('IngredientCategory'), v);
        },
        message: `IngredientCategory doesn't exist`,
      },
      required: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
      validate: {
        isAsync: true,
        validator: function (v) {
          return foreignKeyHelper(mongoose.model('Unit'), v);
        },
        message: `Unit doesn't exist`,
      },
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    alertQuantity: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Ingredient', IngredientSchema);
