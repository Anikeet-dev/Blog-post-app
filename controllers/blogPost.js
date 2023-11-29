const Blog = require('../models/blog');

exports.getBlogPage = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.render('create-blog', { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.getBlogPost = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs); 
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const blogTitle = req.body.blogTitle;
    const blogAuthor = req.body.blogAuthor;
    const blogContent = req.body.blogContent;

    const newBlog = await Blog.create({
      blogTitle: blogTitle,
      blogAuthor: blogAuthor,
      blogContent: blogContent,
    });

    res.status(201).json({ newBlogDetails: newBlog });
  } catch (err) {
    console.error('Error creating blog:', err);
     }
};
