const router = require("express").Router();
const Ingredient = require("../models/Ingredient");

//create a ingredient

router.post("/", async (req, res) => {
  // if(req.body.isAdmin){
  const newIngredient = new Ingredient(req.body);
  try {
    const savedIngredientCategory = await newIngredient.save();
    res.status(200).json(savedIngredientCategory);
  } catch (err) {
    res.status(500).json(err);
  }

  // } else{
  //     return res.status(403).json("You are unauthorized.")
  // }
});

//update ingredient
router.put("/:id", async (req, res) => {
  // if(req.body.isAdmin){
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("IngredientCategory has been Updated");
  } catch (err) {
    return res.status(500).json(err);
  }

  // } else{
  //     return res.status(403).json("You are unauthorized.")
  // }
});

//Delete ingredient
router.delete("/:id", async (req, res) => {
  // if(req.body.isAdmin){
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, {
      //.findByIdAndRemove(req.params.id);
      active: false,
    });
    res.status(200).json("Ingredient has been Deleted");
  } catch (err) {
    return res.status(500).json(err);
  }

  // } else{
  //     return res.status(403).json("You are unauthorized.")
  // }
});

// Get ingredient

router.get("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    const { updatedAt, ...other } = ingredient._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all ingredients

router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ active: "true" })
      .populate("category", "name")
      .populate("unit", "code");
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
