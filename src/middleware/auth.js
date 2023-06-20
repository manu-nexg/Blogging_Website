const jwt = require('jsonwebtoken');

const authentication = async function(req,res,next){
    try{
        let token = req.headers['x-api-key'];
        if(!token) return res.status(400).send({status:false, message:"Please provide token to login"});

        jwt.verify(token,'secret-key', function(err,decodedToken){
            if(err) return res.status(401).send({status:false, message:"Invalid Token"});
            req.token = decodedToken;
           // console.log(req.token.role);
            next();
        });
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}



const authorization = async function(req,res,next) {
    const {role} = req.token;
    //console.log(role);
    if(role == 'Admin' || role=='Editor') return next();

    else return res.status(403).send({status:false, message:"Unauthorized User"})
}


module.exports = {authentication,authorization};