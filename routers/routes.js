const router=require('express').Router();
const jwt=require('jsonwebtoken');
const {runQuery}=require('../config/db')
const {authenticateToken} = require('../middlewares/mid')
//for generating token based on student persent in db
router.post("/student", async (req,res)=>{
    const excuteQuery= await runQuery('select * from student')
    const stu=excuteQuery.find(s=>s.name===req.body.name)
     const student=JSON.stringify(stu)
    console.log(student)
    if(student!=undefined){
        const accessToken=jwt.sign(student,process.env.SECRET_KEY)
        res.status(200).json({accessToken:accessToken})
    }
     else{
         res.sendStatus(401)
     }
})
//verifying student with token
router.get("/getstudent",authenticateToken,async (req,res,next)=>{
    try{
         const executeQuery= await runQuery('select * from student')
         const student= executeQuery.filter(s=>s.name===req.student.name)
         console.log(student)
        res.status(200).send(student)
    }catch (err){
        res.send(500)
        next(err)
    }
})
module.exports=router;