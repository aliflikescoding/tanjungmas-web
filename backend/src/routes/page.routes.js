const express = require("express");
const uploadPageImageMiddleware = require("../middlewares/uploadMiddlware");
const {
  uploadPageLogo,
  getPageLogo,
} = require("../controllers/page.controller");

const router = express.Router();

// GET: Fetch page logo
router.get("/page/logo", getPageLogo);

// POST: Upload page logo
router.post("/page/logo", uploadPageImageMiddleware, uploadPageLogo);

module.exports = router;
