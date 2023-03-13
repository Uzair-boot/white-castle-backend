const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;
require('dotenv').config();

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: 'Unauthorized! Access Token was expired!' });
  }
  return res.status(401).send({ message: 'Unauthorized!' });
};
const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token || token.replace('Bearer ', '').length === 0) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(
    token.replace('Bearer ', ''),
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.user = decoded.User;
      console.log('🚀 ~ file: authJWT.js:26 ~ verifyToken ~ user:', req.user);
      next();
    },
  );
};
const canManageIngredients = (req, res, next) => {
  console.log('Checking if user can manage orders...');
  if (
    !req.user ||
    !req.user.role ||
    !req.user.role.access ||
    !req.user.role.access.includes('ingredients')
  ) {
    console.log('You shall not pass!');
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }
  console.log('go next...');
  next();
};
module.exports = { verifyToken, canManageIngredients };
