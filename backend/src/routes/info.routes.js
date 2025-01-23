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
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/info/category", getInfoCategory);

router.post("/info/category", verifyJWT, postInfoCategory);

router.put("/info/category/:id", verifyJWT, updateInfoCategory);

router.delete("/info/category/:id", verifyJWT, deleteInfoCategory);

router.get("/info/category/:id/text", getInfoTextBasedOnCategory);

router.get("/info/text", getInfoText);

router.post("/info/text", verifyJWT, postInfoText);

router.put("/info/text/:id", verifyJWT, updateInfoText);

router.delete("/info/text/:id", verifyJWT, deleteInfoText);

router.get("/info/blog", getInfoBlog);

router.get("/info/category/:id/blog", getInfoBlogByCategory);

router.post("/info/blog", verifyJWT, uploadMultipleInfoImagesMiddleware, postInfoBlog);

router.put("/info/blog/:id", verifyJWT, uploadMultipleInfoImagesMiddleware, putInfoBlog);

router.delete("/info/blog/:id", verifyJWT, deleteInfoBlog);

module.exports = router;
