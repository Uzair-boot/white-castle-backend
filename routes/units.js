const router = require("express").Router();
const Unit = require("../models/Unit");

//create a unit

router.post("/", async (req, res) => {
  // if(req.body.isAdmin){
  const newUnit = new Unit(req.body);
  try {
    const savedUnit = await newUnit.save();
    res.status(200).json(savedUnit);
  } catch (err) {
    res.status(500).json(err);
  }

  // } else{
  //     return res.status(403).json("You are unauthorized.")
  // }
});

//update unit
router.put("/:id", async (req, res) => {
  if (req.body.isAdmin) {
    try {
      const unit = await Unit.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Unit has been Updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are unauthorized.");
  }
});

//Delete unit
router.delete("/:id", async (req, res) => {
  if (req.body.isAdmin) {
    try {
      const unit = await Unit.findByIdAndDelete(req.params.id);
      res.status(200).json("Unit has been Deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are unauthorized.");
  }
});

// Get unit

router.get("/:id", async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    const { updatedAt, ...other } = unit._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all units

router.get("/", async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
