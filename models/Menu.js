const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      max: 50,
    },
    desc: {
      type: String,
      max: 500,
    },
    type: {
      type: String,
      max: 50,
    },
    img: {
      type: String,
    },

    // likes :{
    //     type : Array,
    //     default : []
    // }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Menu", MenuSchema);
