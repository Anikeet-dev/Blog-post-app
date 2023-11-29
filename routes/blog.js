const express = require('express');
const blogPostController = require('../controllers/blogPost');
const router = express.Router();

router.post('/createBlog', blogPostController.createPost);
router.get('/get-blogs',blogPostController.getBlogPost);
router.get('/', blogPostController.getBlogPage);


module.exports = router;
