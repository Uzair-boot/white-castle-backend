const router = require('express').Router();
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

//update role
router.put('/:id', async (req, res) => {
  if (req.body.roleId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const role = await Role.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Accont has been Updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can Update your account only');
  }
});

//Delete role
router.delete('/:id', async (req, res) => {
  if (req.body.roleId === req.params.id || req.body.isAdmin) {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      res.status(200).json('Accont has been Deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can Delete your account only');
  }
});

// Get role

router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    const { password, updatedAt, ...other } = role._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  res.send('This is Role Route');
});

module.exports = router;
