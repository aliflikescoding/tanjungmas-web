const express = require("express");
const uploadMultipleBeritaImagesMiddleware = require("../middlewares/uploadMultipleBeritaImagesMiddleware");
const {
  getBeritaCategory,
  getBeritaCategoryBasedOnID,
  postBeritaCategory,
  updateBeritaCategory,
  deleteBeritaCategory,
  getBerita,
  getBeritaByCategory,
  getBeritaPreview,
  getBeritaBasedOnId,
  getBeritaByCategoryPreview,
  postBerita,
  putBerita,
  deleteBerita,
} = require("../controllers/berita.controller");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

// Berita Category Routes
router.get("/berita/category", getBeritaCategory);
router.get("/berita/category/:id", getBeritaCategoryBasedOnID);
router.post("/berita/category", verifyJWT, postBeritaCategory);
router.put("/berita/category/:id", verifyJWT, updateBeritaCategory);
router.delete("/berita/category/:id", verifyJWT, deleteBeritaCategory);

// Berita Routes
router.get("/berita", getBerita);
router.get("/berita/preview", getBeritaPreview);
router.get("/berita/:id", getBeritaBasedOnId);
router.get("/berita/category/:id/blog", getBeritaByCategory);
router.get("/berita/category/:id/blog/preview", getBeritaByCategoryPreview);
router.post(
  "/berita",
  verifyJWT,
  uploadMultipleBeritaImagesMiddleware,
  postBerita
);
router.put(
  "/berita/:id",
  verifyJWT,
  uploadMultipleBeritaImagesMiddleware,
  putBerita
);
router.delete("/berita/:id", verifyJWT, deleteBerita);

module.exports = router;
