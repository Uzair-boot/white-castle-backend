const router = require("express").Router();
const Menu = require("../models/Menu");
const User = require("../models/User");

//create a menu

router.post("/", async (req, res) => {
  const newMenu = new Menu(req.body);
  try {
    const savedMenu = await newMenu.save();
    res.status(200).json(savedMenu);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a menu

router.put("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (menu.userId === req.body.userId) {
      await menu.updateOne({ $set: req.body });
      res.status(200).json("menu updated");
    } else {
      res.status(403).json("you can update your menu only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a menu

router.delete("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (menu.userId === req.body.userId) {
      await menu.deleteOne();
      res.status(200).json("Menu deleted");
    } else {
      res.status(403).json("you can delete your Menu only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a menu

router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all menues

router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
