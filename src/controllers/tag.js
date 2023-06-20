const { isValidObjectId } = require('mongoose');
const tagModel = require('../models/tag');
const userModel = require('../models/user');

const createTag = async function(req,res) {
    try{
        const {name} = req.body;

        if(!name) return res.status(400).send({status:false, message:"Tag name is mandatory"});

        const tagExist = await tagModel.findOne({name})
        if(tagExist) return res.status(400).send({status:false, message:"This tag is already present"})

        const tagCreated = await tagModel.create(req.body);

        return res.status(201).send({status:true, message:"Tag created successfully",data:tagCreated})
    }
    catch(err) {
        return res.status(500).send({status:false, message:err.message})
    }
}


const updateTagById = async function(req,res) {
    try{
        let tagId = req.params.id;
        let data = req.body

        if(!isValidObjectId(tagId)) return res.status(400).send({status:false, message:"Not a valid Object Id"});
        let findPost = await tagModel.findByIdAndUpdate({_id:tagId},{$set:data},{new:true});
        if(!findPost) return res.status(404).send({status:false, message:"This Tag doesn't exist"});

        return res.status(200).send({status:true, message:"Tag updated successfully", data:findPost})


    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const getAllTags = async function(req, res){
    try{
        const tagList = await tagModel.find().select({__v:0});
        if(!tagList) return res.status(404).send({status:false, message:"Tag list can't be fetched"});

        return res.status(200).send({status:true, message:"Tag List", data:tagList});
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const getTagById = async function(req,res){
    try{
        let tagId = req.params.id;

        let findTag = await tagModel.findById({_id:tagId});
        if(!findTag) return res.status(404).send({status:false, message:"Tag not found"});
        return res.status(200).send({status:true, message:"Tag found", data:findTag});

    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}



const deleteTagById = async function(req,res) {
    try{
        const tagId = req.params.id;
        let id = req.token.userId;
        const findUser = await userModel.findById({_id:id});
        let {role,permission} = findUser;
        
        let deleteFunc = async function(){
        const deletedTag = await tagModel.findByIdAndDelete({_id:tagId});
        if(!deletedTag) return res.status(404).send({status:false,message:"No Such tag found"})
        return res.status(200).send({status:true, message:"Tag deleted successfully"});
        }
        if(role =='Admin'){ 
            deleteFunc();
        }
        else if(permission.length !== 0) {
            if(permission.indexOf('Delete') !== -1){
                deleteFunc();
            }
        }
                
        else return res.status(403).send({status: false,message: "You are not allowed to do this action"});
    
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

module.exports = {createTag, updateTagById, getAllTags,getTagById,deleteTagById}

