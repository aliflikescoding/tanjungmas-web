const express = require("express");
const uploadPageImageMiddleware = require("../middlewares/uploadMiddlware");
const {
  uploadPageLogo,
  getPageLogo,
  getHeroImage
} = require("../controllers/page.controller");

const router = express.Router();

// GET: Fetch page logo
router.get("/page/logo", getPageLogo);

// POST: Update page logo
router.post("/page/logo", uploadPageImageMiddleware, uploadPageLogo);

// GET: Fetch hero image
router.get("/page/hero", getHeroImage);

module.exports = router;
