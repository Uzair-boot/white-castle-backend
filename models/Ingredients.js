const mongoose = require('mongoose');
const FKHelper = require("./helpers/foreign-key-helper")
const Schema = mongoose.Schema;

const IngredientSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'IngredientCategory',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model("IngredientCategory"), v)
            },
            message: `IngredientCategory doesn't exist`
        },
        required: true,
    },
    unit : {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model("Unit"), v)
            },
            message: `Unit doesn't exist`
        },
        required: true,
    },
    value : {
        type: Number,
        require: true,
    },
    alertQuantity : {
        type: Number,
        require: true,
    },
    active : {
        type: Boolean,
        default: true
    },
    desc:{
        type: String,
        max: 50
    },
},

{timestamps: true}
)

module.exports = mongoose.model("Ingredient", IngredientSchema);
