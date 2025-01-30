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
  getLayananCategoryBasedOnID,
  getLayananBlogPreview,
  getLayananBlogBasedOnId,
  getLayananBlogByCategoryPreview,
} = require("../controllers/layanan.controller");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

// layanan category
router.get("/layanan/category", getLayananCategory);
router.get("/layanan/category/:id", getLayananCategoryBasedOnID);
router.post("/layanan/category", verifyJWT, postLayananCategory);
router.put("/layanan/category/:id", verifyJWT, updateLayananCategory);
router.delete("/layanan/category/:id", verifyJWT, deleteLayananCategory);

// layanan text
router.get("/layanan/category/:id/text", getLayananTextBasedOnCategory);
router.get("/layanan/text", getLayananText);
router.post("/layanan/text", verifyJWT, postLayananText);
router.put("/layanan/text/:id", verifyJWT, updateLayananText);
router.delete("/layanan/text/:id", verifyJWT, deleteLayananText);

// layanan blog system
router.get("/layanan/blog", getLayananBlog);
router.get("/layanan/blog/preview", getLayananBlogPreview);
router.get("/layanan/blog/:id", getLayananBlogBasedOnId);
router.get("/layanan/category/:id/blog", getLayananBlogByCategory);
router.get(
  "/layanan/category/:id/blog/preview",
  getLayananBlogByCategoryPreview
);
router.post("/layanan/blog", verifyJWT, uploadMultipleLayananImagesMiddleware, postLayananBlog);
router.put("/layanan/blog/:id", verifyJWT, uploadMultipleLayananImagesMiddleware, putLayananBlog);
router.delete("/layanan/blog/:id", verifyJWT, deleteLayananBlog);

module.exports = router;
