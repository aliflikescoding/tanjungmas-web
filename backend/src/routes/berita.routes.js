const express = require("express");
const {
  getBeritaCategory,
  postBeritaCategory,
  updateBeritaCategory,
  deleteBeritaCategory,
  getBerita,
  getBeritaByCategory,
  postBerita,
  putBerita,
  deleteBerita,
} = require("../controllers/berita.controller");
const uploadMultipleBeritaImagesMiddleware = require("../middlewares/uploadMultipleBeritaImagesMiddleware");

const router = express.Router();

router.get("/berita/category", getBeritaCategory);
router.post("/berita/category", postBeritaCategory);
router.put("/berita/category/:id", updateBeritaCategory);
router.delete("/berita/category/:id", deleteBeritaCategory);

router.get("/berita", getBerita);
router.get("/category/:categoryId/berita", getBeritaByCategory);
router.post("/berita", uploadMultipleBeritaImagesMiddleware, postBerita);
router.put("/berita/:id", uploadMultipleBeritaImagesMiddleware, putBerita);
router.delete("/berita/:id", deleteBerita);

module.exports = router;