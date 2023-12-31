const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../utils/auth");

router.post("/", auth, blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.patch("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);


module.exports = router;
