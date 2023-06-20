const express = require('express');
const router = express.Router();
const postRoute = require('./post');
const tagRoute = require('./tag');
const categoryRoute = require('./category');
const userRoute = require('./user');
const rbacRoute = require('./rbac')

router.use('/tag', tagRoute);

router.use('/category', categoryRoute);

router.use('/post', postRoute);

router.use('/user', userRoute);

router.use('/rbac',rbacRoute);



module.exports = router;


