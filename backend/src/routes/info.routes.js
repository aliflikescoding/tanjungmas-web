const express = require("express");
const uploadMultipleInfoImagesMiddleware = require("../middlewares/uploadMultipleInfoImagesMiddleware");
const {
  getInfoCategory,
  postInfoCategory,
  updateInfoCategory,
  deleteInfoCategory,
  getInfoTextBasedOnCategory,
  getInfoText,
  postInfoText,
  updateInfoText,
  deleteInfoText,
  getInfoBlog,
  getInfoBlogByCategory,
  postInfoBlog,
  putInfoBlog,
  deleteInfoBlog,
  getInfoCategoryBasedOnID,
  getInfoBlogPreview,
  getInfoBlogBasedOnId,
  getInfoBlogByCategoryPreview,
  getInfoTextBasedOnCategoryPreview,
  getInfoTextBasedOnId,
} = require("../controllers/info.controller.js");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

// Info Category Routes
router.get("/info/category", getInfoCategory);
router.get("/info/category/:id", getInfoCategoryBasedOnID);
router.post("/info/category", verifyJWT, postInfoCategory);
router.put("/info/category/:id", verifyJWT, updateInfoCategory);
router.delete("/info/category/:id", verifyJWT, deleteInfoCategory);

// Info Text Routes
router.get("/info/category/:id/text", getInfoTextBasedOnCategory);
router.get(
  "/info/category/:id/text/preview",
  getInfoTextBasedOnCategoryPreview
);
router.get("/info/text", getInfoText);
router.get("/info/text/:id", getInfoTextBasedOnId);
router.post("/info/text", verifyJWT, postInfoText);
router.put("/info/text/:id", verifyJWT, updateInfoText);
router.delete("/info/text/:id", verifyJWT, deleteInfoText);

// Info Blog Routes
router.get("/info/blog", getInfoBlog);
router.get("/info/blog/preview", getInfoBlogPreview);
router.get("/info/blog/:id", getInfoBlogBasedOnId);
router.get("/info/category/:id/blog", getInfoBlogByCategory);
router.get("/info/category/:id/blog/preview", getInfoBlogByCategoryPreview);
router.post(
  "/info/blog",
  verifyJWT,
  uploadMultipleInfoImagesMiddleware,
  postInfoBlog
);
router.put(
  "/info/blog/:id",
  verifyJWT,
  uploadMultipleInfoImagesMiddleware,
  putInfoBlog
);
router.delete("/info/blog/:id", verifyJWT, deleteInfoBlog);

module.exports = router;
