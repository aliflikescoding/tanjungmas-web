const express = require("express");
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
} = require("../controllers/info.controller.js");
const uploadMultipleInfoImagesMiddleware = require("../middlewares/uploadMultipleInfoImagesMiddleware");

const router = express.Router();

router.get("/info/category", getInfoCategory);

router.post("/info/category", postInfoCategory);

router.put("/info/category/:id", updateInfoCategory);

router.delete("/info/category/:id", deleteInfoCategory);

router.get("/info/category/:id/text", getInfoTextBasedOnCategory);

router.get("/info/text", getInfoText);

router.post("/info/text", postInfoText);

router.put("/info/text/:id", updateInfoText);

router.delete("/info/text/:id", deleteInfoText);

router.get("/info/blog", getInfoBlog);

router.get("/info/category/:id/blog", getInfoBlogByCategory);

router.post("/info/blog", uploadMultipleInfoImagesMiddleware, postInfoBlog);

router.put("/info/blog/:id", uploadMultipleInfoImagesMiddleware, putInfoBlog);

router.delete("/info/blog/:id", deleteInfoBlog);

module.exports = router;
