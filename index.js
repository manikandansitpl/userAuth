const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const router = require('./route/userRouter');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorMiddle');
const cookieParser = require('cookie-parser')

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(cookieParser())

app.use('/user', router);
app.use(errorHandler)

mongoose.connect(process.env.URL).then(res=>{
    console.log("DB is connected")
}).catch(err => console.log(err.message))


app.listen(process.env.PORT,()=>{
    console.log(`port${process.env.PORT}  is connected`)
})
