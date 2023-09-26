const jwt = require('jsonwebtoken');
const User = require('../models/userScheema');

const verifyToken= async(req ,res, next)=>{
    const authHead = req.headers.authorization;
    if(authHead){
   const token = authHead.split(" ")[1];
    jwt.verify(token , process.env.JWT_KEY ,async (err , decode)=>{
        if(err) return  res.json({
                isLoggedin:false,
                message:"Faild To Authenticate"
            })
          const user = await User.findOne({_id:decode.id})
          if(!user){
           return  res.status(404).json({
                success:false,
                message:"user not found"
            })
          }
          req.user = user;
          next()
    })
   } else{
    return res.json({message:"Incorrect Token Given" , isLoggedin:false})
   }
}

module.exports = verifyToken;