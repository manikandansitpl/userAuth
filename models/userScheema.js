const mongoose = require('mongoose');

const userScheema = new mongoose.Schema({
        email:{
            type:String,
            require:[true , "Please enter the email"],
            unque:true
        },
        username:{
            type:String,
            require:[true , "please enter the user name"],
            unique:true
        },
        password:{
            type:String,
            require:[true , "Please enter the password"]
        }
})

const User = mongoose.model('User' , userScheema)

module.exports = User;