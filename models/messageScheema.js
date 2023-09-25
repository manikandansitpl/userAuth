const mongoose = require('mongoose');

const messageScheema =  mongoose.Schema({
    user_Id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required: [true , 'title required']
    },

    body :{
        type:String,
        required:[true , "body is required"]
    }
})

const Msg =  mongoose.model("message" , messageScheema)

module.exports = Msg;