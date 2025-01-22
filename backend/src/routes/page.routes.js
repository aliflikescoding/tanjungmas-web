const express = require("express");
const uploadLogoMiddleware = require("../middlewares/uploadLogoMiddleware");
const uploadHeroImageMiddleware = require("../middlewares/uploadHeroImageMiddleware");
const {
  uploadPageLogo,
  getPageLogo,
  getHeroImage,
  uploadHeroImage,
  getNavbarImages,
  postNavbarImages,
  putNavbarImages,
  deleteNavbarImages,
} = require("../controllers/page.controller");
const uploadNavbarImagesMiddleware = require("../middlewares/uploadNavbarImagesMiddleware");

const router = express.Router();

// GET: Fetch page logo
router.get("/page/logo", getPageLogo);

// POST: Update page logo
router.post("/page/logo", uploadLogoMiddleware, uploadPageLogo);

// GET: Fetch hero image
router.get("/page/hero", getHeroImage);

// POST: Update hero image
router.post("/page/hero", uploadHeroImageMiddleware, uploadHeroImage);

// GET: Fetch navbar images
router.get("/page/navbar", getNavbarImages);

// POST: Post navbar images
router.post("/page/navbar", uploadNavbarImagesMiddleware, postNavbarImages);

// PUT: Update navbar images based on id
router.put("/page/navbar/:id", uploadNavbarImagesMiddleware, putNavbarImages);

// DELETE: Delete navbar images based on id
router.delete("/page/navbar/:id", deleteNavbarImages);

module.exports = router;
