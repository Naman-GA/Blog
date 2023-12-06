const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const logger = require("../utils/logger");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const newBlog = await Blog.create({
      title: title,
      content: content,
    });
    const user = await User.findByPk(userId);
    if (user) {
      await newBlog.setUser(user); // Associate the blog with the user
    }
    res.status(201).json(newBlog);
    logger.info("New Blog Created");
  } catch (error) {
    res.status(401).json(error);
    logger.error(`Error Reported in Create Blog :${error.message}`);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    logger.error(`Error Reported in Get Blog List :${error.message}`);
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    logger.error(`Error fetching a blog by ID: ${error.message}`);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    const [updatedRowsCount] = await Blog.update(
      { title, content },
      { where: { id: blogId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const updatedBlog = await Blog.findByPk(blogId);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
    logger.error(`Error updating a blog: ${error.message}`);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedRowsCount = await Blog.destroy({ where: { id: blogId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(201).json({ message: "Blog Deleted successfully" });
    logger.info("Blog Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    logger.error(`Error deleting a blog: ${error.message}`);
  }
};
