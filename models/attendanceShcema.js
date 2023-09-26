const mongoose = require("mongoose");

const attendance = new mongoose.Schema({
    user_Id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true , "please enter your name"]
    },
    position:{
            type:String,
    },
    inTime:{
        type:String,
        require:[true , "Please enter IN-TIME"]
    },
    outTime:{
            type:String,
            require:[true , "Please enter OUT-TIME"]
    },
    altDate:{
        type:String,
        default:()=>Date.now()
    },
    studyDetails:{
        type:String,
        required:[true , "Pease enter the study details"]
    },
    createAt:{
        type:Date,
        default:()=>Date.now()
    }
}) 

const Atten = mongoose.model("attendance" , attendance);

module.exports = Atten;