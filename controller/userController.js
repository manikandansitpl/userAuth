const asyncHandler = require('express-async-handler');
const User = require('../models/userScheema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Msg = require('../models/messageScheema');
const nodemailer = require("nodemailer");


const UserRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !password || !email) {
            res.status(400)
            throw new Error("Please fill all the fields")
        }

        const userExist = await User.findOne({ username })
        if (userExist) {
            res.status(400)
            throw new Error("user Already exsist");
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })
        user.save().then(detail => {
            res.status(201).json({
                success: true,
                message: "user Created Successfully",
                detail
            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "user creation  faild !!"
            })
        })


    } catch (err) {
        throw new Error(err.message)
    }
})


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (users) {
        res.status(200).json({
            success: true,
            users
        })
    } else {
        res.status(500).json({
            success: false,
            message: "user not Found !!"
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    await User.findOne({ username }).then(dbUser => {
        if (!dbUser) {
            return res.status(500).json({
                success: false,
                message: "Invalid UserName !!"
            })
        }
        bcrypt.compare(password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    jwt.sign({ id: dbUser._id }
                        , process.env.JWT_KEY
                        , { expiresIn: '1hr' },
                        (err, token) => {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "login Faild !!"
                                })
                            }
                            return res.status(200).json({ success: true, message: "login Successfully !!", token, userDetails:dbUser })
                        })

                }else{
                   return res.status(500) .json({success:false , message:"Please Enter Correct Password !!"})
                }
            }).catch(err => res.status(500) .json({success:false , message:"Login Error"}))
    })
})

const createNote =asyncHandler(async(req ,res)=>{
    const {title ,body} = req.body;
    const message = await Msg.create({title ,body ,user_Id:req.user.id})
    const result = await message.save()

    if(result){
      return  res.status(201).json({
            success:true,
            message:'note created successfully',
            data : result
        })
    } else{
       return res.status(404).json({
            success:false,
            message:"note not found"
        })
    }
     
})

const getNote = asyncHandler(async(req,res)=>{
    const message = await Msg.find({user_Id:req.user.id});
    if(message){
        return  res.status(201).json({
              success:true,
              message
          })
      } else{
         return res.status(404).json({
              success:false,
              message:"note not found"
          })
      }
})

const sendEmail = asyncHandler(async (req ,res) => {
    const { username , email } = req.user;
    const code = Math.floor(Math.random() * 80000) + 10000 ;
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "multidiscoverserver@gmail.com",
        pass: "ihnuqfzpuewzzaoe",
      },
    });
   
    const mailOptions = {
      from: "multidiscoverserver@gmail.com",
      to: email,
      subject: "Account ID and verification code ",
      text: `This is your User Id : ${username} and  verification code : ${code} .`,
    };
     
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json(error);
      }
      return res.status(200).json({message:"Password reset email sent"});
    });
});
module.exports = { UserRegister,sendEmail, getUsers, loginUser,createNote ,getNote}