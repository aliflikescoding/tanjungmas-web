const express = require("express");
const uploadBigImageMiddleware = require("../middlewares/uploadBigImageMiddleware");
const uploadSmallImageMiddleware = require("../middlewares/uploadSmallImageMiddleware");
const {
  uploadBigImage,
  uploadSmallImage,
  getBigImage,
  getSmallImage,
} = require("../controllers/tentang.controller");
const router = express.Router();

router.get("/tentang/big", getBigImage);

router.post("/tentang/big", uploadBigImageMiddleware, uploadBigImage);

router.get("/tentang/small", getSmallImage);

router.post("/tentang/small", uploadSmallImageMiddleware, uploadSmallImage);

module.exports = router;