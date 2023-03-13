const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('IngredientCategory', IngredientSchema);
