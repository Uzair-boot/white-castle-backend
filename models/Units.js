const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    code : {
        type: String,
        require: true,
        min: 1,
        max: 10,
        unique: true,
    },

    name : {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },

    baseCode : {
        type: String,
        min: 1,
        max: 10,
    },

    baseMultiplier : {
        type: Number,
        default: 1
    },

    desc:{
        type: String,
        max: 50
    },
},

{timestamps: true}
)

module.exports = mongoose.model("Unit", UnitSchema);
