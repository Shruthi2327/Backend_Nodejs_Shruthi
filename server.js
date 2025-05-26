const express=require('express');

const mongoose=require('mongoose');

const dotEnv=require('dotenv');

dotEnv.config();
const app=express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log(`database connection was successful`)})
.catch((error)=>{console.log(error)})
const Vendor=require("./models/Vendor")

const vendorRoutes=require('./routes/vendorRoutes')
//now using this for the routes
app.use('/vendor',vendorRoutes)
const firmRoutes=require('./routes/firmRoutes')
app.use('/firm',firmRoutes)
const port=3000;

app.listen(port,()=>{
    console.log(`app is listening on the port ${port}`)
})

//creating a basic route to check the 
app.get("/home",(req,res)=>{
    res.send("root is working re fellow!");
})