const userModel = require('../models/user');

const updateRoleByAdmin = async function(req,res){
    try{
        let adminId = req.token.userId;
        let userId = req.params.id;
        let {role} = req.body;

        let findUser = await userModel.findById({_id:adminId});
        if(findUser.role !== 'Admin') return res.status(403).send({status:false,message:"You are not allowed to do this action"});
     
        if(Object.keys(req.body).length == 0) return res.status(400).send({status:false, message:"Please provide data to update"})
        let updatedRole = await userModel.findByIdAndUpdate({_id:userId},{$set:req['body']},{new:true});
        return res.status(200).send({status:true,message:"Role updated successfully",data:updatedRole});
        
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const getUserDetails = async function(req,res){
    try{
        let adminId = req.token.userId;
        const findRole = await userModel.findById({_id:adminId});
        if(req.token.role !== 'Admin') return res.status(403).send({status:false, message:"You are not allowed to do this action"})
        return res.status(200).send({status:true, message:"User details found", data:findRole})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}



module.exports = {updateRoleByAdmin,getUserDetails}