require('dotenv').config();
const express= require('express');
const student=require('./routers/routes')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",student)
app.listen(process.env.SERVER_PORT,()=>console.log(" server is running on port " + process.env.SERVER_PORT))