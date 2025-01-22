const express = require("express");
const uploadLogoMiddleware = require("../middlewares/uploadLogoMiddleware");
const uploadHeroImageMiddleware = require("../middlewares/uploadHeroImageMiddleware");
const {
  uploadPageLogo,
  getPageLogo,
  getHeroImage,
  uploadHeroImage
} = require("../controllers/page.controller");

const router = express.Router();

// GET: Fetch page logo
router.get("/page/logo", getPageLogo);

// POST: Update page logo
router.post("/page/logo", uploadLogoMiddleware, uploadPageLogo);

// GET: Fetch hero image
router.get("/page/hero", getHeroImage);

// POST: Update hero image
router.post("/page/hero", uploadHeroImageMiddleware, uploadHeroImage);

module.exports = router;
