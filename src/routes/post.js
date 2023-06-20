const express = require('express');
const router = express.Router();
const {createPost,getPostById, updatePost, getAllPosts,deletePostById,} = require('../controllers/post');
const {authentication, authorization} = require('../middleware/auth')

router.post('/create', authentication, authorization,createPost);

router.get('/getPostById/:id', getPostById);

router.put('/update/:id', authentication, authorization,updatePost);

router.get('/getAll', getAllPosts);

router.delete('/delete/:id', authentication, authorization,deletePostById);



module.exports = router;