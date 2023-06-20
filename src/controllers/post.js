const postModel = require("../models/post");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const path = require("path");
const userModel = require('../models/user')

const createPost = async function (req, res) {
  try {
    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
      profile_image,
      featured_image,
    } = req.body;

    let img = fs.readFileSync(profile_image);
    profile_image = Buffer.from(img).toString("base64");
    //console.log(profile_image)

    let img2 = fs.readFileSync(featured_image);
    featured_image = Buffer.from(img2).toString("base64");
    //console.log(featured_image)

    const postCreated = await postModel.create({
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
      profile_image,
      featured_image,
    });
    return res
      .status(201)
      .send({
        status: true,
        message: "Post added successfully",
        data: postCreated,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


const getPostById = async function (req, res) {
  try {
    let postId = req.params.id;
    if (!isValidObjectId(postId))
      return res
        .status(400)
        .send({ status: false, message: "Not a valid object id" });

    const findPost = await postModel.findById({ _id: postId });
    if (!findPost)
      return res
        .status(404)
        .send({ status: false, message: "Post doesn't exist" });

    let img = Buffer.from(findPost.profile_image, "base64");
    fs.writeFileSync("profile.png", img);

    const resolvedPath = path.resolve("path", "to", "profile.png");
    //console.log(resolvedPath);

    let img2 = Buffer.from(findPost.featured_image, "base64");
    fs.writeFileSync("featuredImage.png", img2);

    const resolvedPath2 = path.resolve("path", "to", "featuredImage.png");
    //console.log(resolvedPath2);

    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
      profile_image,
      featured_image,
    } = findPost;

    let data = {
      title,
      profile_image: resolvedPath,
      featured_image: resolvedPath2,
      tag,
      short_description,
      description: description,
      category,
      subcategory,
    };

    //profile_image = resolvedPath;   
    return res.status(200).send({ status: true, data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};





const getAllPosts = async function (req, res) {
  try {
    const postList = await postModel.find();
    if (!postList)
      return res
        .status(404)
        .send({ status: false, message: "No post to show" });

    return res.status(200).send({ status: true, data: postList });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




const updatePost = async function (req, res) {
  try {
    // let data = req.body;
    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
      profile_image,
      featured_image,
    } = req.body;

    const postId = req.params.id;

    if (!isValidObjectId(postId))
      return res
        .status(400)
        .send({ status: false, message: "Not a valid object id" });

        if(profile_image){
            let img = fs.readFileSync(profile_image);
            profile_image = Buffer.from(img).toString("base64");
        }
        if(featured_image){
            let img2 = fs.readFileSync(featured_image);
            featured_image = Buffer.from(img2).toString("base64");
        }

        let data = {
          title,
          short_description,
          description,
          category,
          subcategory,
          tag,
          profile_image:profile_image,
          featured_image:featured_image,
        }


    const updatePost = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $set: data },
      { new: true }
    );
    if (!updatePost)
      return res
        .status(404)
        .send({ status: false, message: "Post doesn't exist" });
    return res
      .status(200)
      .send({
        status: true,
        message: "Updated successfully",
        data: updatePost,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




const deletePostById = async function (req, res) {
  try {
    const postId = req.params.id;
    let id = req.token.userId;
    const findUser = await userModel.findById({_id:id});
    let {role,permission} = findUser;

    let deleteFunc = async function(){
        const deletedPost = await postModel.findByIdAndDelete({ _id: postId });
        if(!deletedPost) return res.status(404).send({status:false,message:"No Such post found"})
        return res.status(200).send({ status: true, message: "Post deleted successfully" });
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
   catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePostById,
  
};
