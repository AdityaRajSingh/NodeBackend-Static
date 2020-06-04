const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>
{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,'lenovo');
        req.userdata=decoded;
        next();
    }
    catch(error)
    {
        res.send("Token Failed").status(401);
    }
}


// authorization:bearer ejfewfywufdwhfiwjfjewjfewofeowfkokfo