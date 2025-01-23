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
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/berita/category", getBeritaCategory);
router.post("/berita/category", verifyJWT, postBeritaCategory);
router.put("/berita/category/:id", verifyJWT, updateBeritaCategory);
router.delete("/berita/category/:id", verifyJWT, deleteBeritaCategory);

router.get("/berita", getBerita);
router.get("/category/:categoryId/berita", verifyJWT, getBeritaByCategory);
router.post("/berita", verifyJWT, uploadMultipleBeritaImagesMiddleware, postBerita);
router.put("/berita/:id", verifyJWT, uploadMultipleBeritaImagesMiddleware, putBerita);
router.delete("/berita/:id", verifyJWT, deleteBerita);

module.exports = router;