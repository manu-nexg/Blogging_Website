const categoryModel = require("../models/category");
const userModel = require('../models/user');
const { isValidObjectId } = require("mongoose");

const createCategory = async function (req, res) {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Category name is mandatory" });

    const catExist = await categoryModel.findOne({ name });
    if (catExist)
      return res
        .status(400)
        .send({ status: false, message: "This category already exists" });

    const catCreated = await categoryModel.create(req.body);
    return res
      .status(201)
      .send({
        status: true,
        message: "Category added successfully",
        data: catCreated,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


const updateCategoryById = async function (req, res) {
  try {
    let data = req.body;
    const { name } = data;
    let catId = req.params.id;

    if (!isValidObjectId(catId))
      return res
        .status(400)
        .send({ status: false, message: "Not a valid object Id" });

    let updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: catId },
      { $set: data },
      { new: true }
    );
    if (!updatedCategory)
      return res
        .status(404)
        .send({ status: false, message: "This categoy doesn't exist" });

    return res
      .status(200)
      .send({
        status: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


const getAllCategories = async function (req, res) {
  try {
    const getAll = await categoryModel.find().select({ __v: 0 });
    if (!getAll)
      return res
        .status(404)
        .send({ status: false, message: "Can't get the categories" });

    return res.status(200).send({ status: true, data: getAll });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


const getCatById = async function(req,res) {
  try{
    let catId = req.params.id;
    const findCategory = await categoryModel.findById({_id:catId});
    if(!findCategory) return res.status(404).send({status:false, message:"Category not found"});
    return res.status(200).send({status:true, message:"Category found", data:findCategory});
    
  }
  catch(err){
    return res.status(500).send({status:false, message:err.message})
  }
}


const deletecategoryById = async function (req, res) {
  try {
       let catId = req.params.id;
        let id = req.token.userId;
        const findUser = await userModel.findById({_id:id});
        let {role,permission} = findUser;
        
        let deleteFunc = async function(){
          const deletedCat = await categoryModel.findByIdAndDelete({ _id: catId });       
           if(!deletedCat) return res.status(404).send({status:false,message:"No Such tag found"})
        return res.status(200).send({status:true, message:"Category deleted successfully"});
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
                
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createCategory,
  updateCategoryById,
  getAllCategories,
  deletecategoryById,
  getCatById
};
