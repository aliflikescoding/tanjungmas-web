const express = require("express");
const uploadMultipleLayananImagesMiddleware = require("../middlewares/uploadMultipleLayananImagesMiddleware");
const {
  getLayananCategory,
  postLayananCategory,
  updateLayananCategory,
  deleteLayananCategory,
  getLayananTextBasedOnCategory,
  getLayananText,
  postLayananText,
  updateLayananText,
  deleteLayananText,
  getLayananBlog,
  getLayananBlogByCategory,
  postLayananBlog,
  putLayananBlog,
  deleteLayananBlog,
} = require("../controllers/layanan.controller");

const router = express.Router();

router.get("/layanan/category", getLayananCategory);

router.post("/layanan/category", postLayananCategory);

router.put("/layanan/category/:id", updateLayananCategory);

router.delete("/layanan/category/:id", deleteLayananCategory);

router.get("/layanan/category/:id/text", getLayananTextBasedOnCategory);

router.get("/layanan/text", getLayananText);

router.post("/layanan/text", postLayananText);

router.put("/layanan/text/:id", updateLayananText);

router.delete("/layanan/text/:id", deleteLayananText);

router.get("/layanan/blog", getLayananBlog);

router.get("/layanan/category/:id/blog", getLayananBlogByCategory);

router.post("/layanan/blog", uploadMultipleLayananImagesMiddleware, postLayananBlog);

router.put("/layanan/blog/:id", uploadMultipleLayananImagesMiddleware, putLayananBlog);

router.delete("/layanan/blog/:id", deleteLayananBlog);

module.exports = router;
