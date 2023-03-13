const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
require("dotenv").config();

//REGISTER A NEW USER
router.post("/register", async (req, res) => {
  try {
    // generate encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user to database and get response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});
// Refresh token
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    !refreshToken && res.status(403).json("Refresh Token is required!");
    let { UserID, SessionID } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
    );

    const session = await Session.findOne({
      _id: SessionID,
    }).populate("user");

    !session && res.status(401).json("Session not found.");

    const accessToken = jwt.sign(
      { User: session.user, SessionID: SessionID },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION },
    );
    !accessToken && res.status(500).json("Error creating access token");
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    !validatePassword && res.status(400).json("wrong Password");

    const session = new Session({
      user: user._id,
    });

    const newSession = await session.save();

    const refreshToken = jwt.sign(
      { UserID: user._id, SessionID: newSession._id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION },
    );
    !refreshToken && res.status(500).json("Error creating refresh token");

    const accessToken = jwt.sign(
      { User: user, SessionID: newSession._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION },
    );
    !accessToken && res.status(500).json("Error creating access token");

    res.status(200).json({ refreshToken, accessToken, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
