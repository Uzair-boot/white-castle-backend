const express = require ('express')
const app = express();
// const MONGO_URL ="mongodb://adminWhite:W%40Castle1@localhost:27017/wc_pos" 
const MONGO_URL ="mongodb://103.18.20.49:3029/wc_pos" 

const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const helmet = require ('helmet');
const morgan = require ('morgan');

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL, (err)=>{
    if(err){
        console.log("Unable to Connect");
    }
    console.log("Connected to MongoDB");
})

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const menuesRoute = require('./routes/menu');
const unitsRoute = require('./routes/units');
const ingredientCategoriesRoute = require('./routes/ingredient-categories');
const ingredientsRoute = require('./routes/ingredients');
//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

var cors = require('cors')
app.use(cors())

app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/menues' , menuesRoute);
app.use('/api/units' , unitsRoute);
app.use('/api/ingredient-categories' , ingredientCategoriesRoute);
app.use('/api/ingredients' , ingredientsRoute);

dotenv.config();

app.listen(8800, ()=>{
    console.log("Backend Server is running");
})