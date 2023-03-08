const router = require("express").Router();
const IngredientCategories = require('../models/IngredientCategories');


//create a ingredientCategory

router.post('/', async (req, res)=>{
    if(req.body.isAdmin){
        const newIngredientCategory = new IngredientCategories(req.body);
        try{
            const savedIngredientCategory = await newIngredientCategory.save();
            res.status(200).json(savedIngredientCategory)
        } catch(err){
            res.status(500).json(err);
        }
        
    } else{
        return res.status(403).json("You are unauthorized.")
    }
})

//update ingredientCategory
router.put('/:id', async (req, res)=>{
    if(req.body.isAdmin){
        try{
            const ingredientCategory = await IngredientCategories.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("IngredientCategory has been Updated")
        } catch(err){
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You are unauthorized.")
    }
});

//Delete ingredientCategory
router.delete('/:id', async (req, res)=>{
    if(req.body.isAdmin){
        try{
            const ingredientCategory = await IngredientCategories.findByIdAndDelete(req.params.id);
            res.status(200).json("Unit has been Deleted")
        } catch(err){
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You are unauthorized.")
    }
});


// Get ingredientCategory

router.get('/:id', async (req, res)=>{
    try{
        const ingredientCategory = await IngredientCategories.findById(req.params.id);
        const {updatedAt, ...other} = ingredientCategory._doc
        res.status(200).json(other);
    } catch(err){
        res.status(500).json(err);
    }
});

// get all ingredientCategorys

router.get('/', async (req, res) => {
    try {
      const ingredientCategories = await IngredientCategories.find();
      res.status(200).json(ingredientCategories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
