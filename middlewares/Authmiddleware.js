const jwt=require('jsonwebtoken')

module.exports =async(req,res,next)=>{
    try {
        const token =await req.headers['authorization'].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
            if(err){
                return res.status(400).send({
                    success:false,
                    message:'Authentication failed'
                })
            }
            else{
                req.body.userId=decode.id;
                next()
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Auth failed'
        })
    }
}
