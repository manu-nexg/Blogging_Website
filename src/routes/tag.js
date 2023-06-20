const express = require('express');
const router = express.Router();
const {createTag, updateTagById, getAllTags,getTagById,deleteTagById} = require('../controllers/tag');
const {authentication, authorization} = require('../middleware/auth');

router.post('/create', authentication, authorization,createTag);

router.put('/update/:id', authentication,authorization,updateTagById);

router.get('/getAll', getAllTags);

router.get('/getTagById', getTagById);

router.delete('/delete/:id',authentication, authorization, deleteTagById);

module.exports = router;