const express = require('express');

require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, err => {
  if (err) {
    console.log('Unable to Connect');
  }
  console.log('Connected to MongoDB');
});

const userRoute = require('./routes/users');
const roleRoute = require('./routes/roles');
const authRoute = require('./routes/auth');
const menuesRoute = require('./routes/menu');
const unitsRoute = require('./routes/units');
const ingredientCategoriesRoute = require('./routes/ingredient-categories');
const ingredientsRoute = require('./routes/ingredients');
//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

var cors = require('cors');
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/roles', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/menues', menuesRoute);
app.use('/api/units', unitsRoute);
app.use('/api/ingredient-categories', ingredientCategoriesRoute);
app.use('/api/ingredients', ingredientsRoute);

dotenv.config();
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
