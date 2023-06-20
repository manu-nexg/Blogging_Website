const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const createUser = async function(req,res) {
    try{
        let {email, phone, password,fName, lName,role} = req.body;
        
        if(!email) return res.status(400).send({status:false, message:"Please provide email Id "});
        const emailExist = await userModel.findOne({email});
        if(emailExist) return res.status(400).send({status:false, message:"This email Id already exists"})

        if(!phone) return res.status(400).send({status:false, message:"Please provide phone number"});        
        const phoneExist = await userModel.findOne({phone});
        if(phoneExist) return res.status(400).send({status:false,message:"This Phone No already exists"})

        if(!password) return res.status(400).send({status:false, message:"Please provide password"});
        if(!fName) return res.status(400).send({status:false, message:"Please provide your first name"});
        if(!role) return res.status(400).send({status:false, message:"Please mention your role => Admin or Editor or Viewer"});

        let userCreated = await userModel.create(req.body);
        return res.status(201).send({status:true, message:"User Created Successfully",data:userCreated});
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const login = async function(req,res){
    try{
        let {email,password} = req.body;

        let findUser = await userModel.findOne({email, password});
        if(!findUser) return res.status(404).send({status:false, message:"User not found"});

        const token = jwt.sign({userId:findUser['_id'].toString(), role:findUser['role']}, 'secret-key');
        
        return res.status(200).send({status:true, message:"Logged In successufully", token:token})

    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const deleteUserById = async function(req,res){
    try{
        let userId = req.params.id;
        
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}



module.exports = {createUser,login}
