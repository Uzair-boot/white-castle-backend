const express = require ('express')
const app = express();
// const MONGO_URL = "mongodb+srv://uzair:BCGoKwvfyFUSIn3L@cluster0.zrjubhl.mongodb.net/?retryWrites=true&w=majority"
const MONGO_URL ="mongodb://localhost:27017" 

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
//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

var cors = require('cors')
app.use(cors())

app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/menues' , menuesRoute);

dotenv.config();

app.listen(8800, ()=>{
    console.log("Backend Server is running");
})