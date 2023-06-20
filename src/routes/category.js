const express = require('express');
const router = express.Router();
const {createCategory, updateCategoryById, getAllCategories,getCatById,deletecategoryById} = require('../controllers/category');
const {authentication, authorization} = require('../middleware/auth');


router.post('/create',authentication,authorization, createCategory);

router.put('/update/:id',authentication,authorization, updateCategoryById);

router.get('/getAll', getAllCategories);

router.get('/getCatById/:id', getCatById);

router.delete('/delete/:id',authentication,authorization, deletecategoryById)


module.exports = router;