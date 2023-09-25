const errorHandler=(err,req,res,next)=>{
    console.log(err)
    const statusCode = res.statusCode ? res.statusCode :500
    switch(statusCode){
        case 400 : 
        return res.json({
            message:err.message ,
            statusCode , 
            stackTrace:err.stack
        });
        break;
        case 404 :res.json({
            message:"Not Found" ,
            statusCode , 
            stackTrace:err.stack
        });
        break;
        case 401 :res.json({
            message:"Un Authorized" ,
            statusCode , 
            stackTrace:err.stack
        });
        break;
        case 403 : res.json({
            message:"Forbiddan" ,
            statusCode , 
            stackTrace:err.stack
        });
        break;
        case 500 : res.json({
            message:"Server Error" ,
            statusCode , 
            stackTrace:err.stack
        });
        break;
        default : console.log('all good !!')
        break;
            
    }
    next()
}

module.exports = errorHandler;