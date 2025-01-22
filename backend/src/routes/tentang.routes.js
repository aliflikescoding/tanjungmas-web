const express = require("express");
const uploadBigImageMiddleware = require("../middlewares/uploadBigImageMiddleware");
const uploadSmallImageMiddleware = require("../middlewares/uploadSmallImageMiddleware");
const {
  uploadBigImage,
  uploadSmallImage,
  getBigImage,
  getSmallImage,
  getVisi,
  updateVisi,
  getMisi,
  postMisi,
  deleteMisi,
  updateMisi,
} = require("../controllers/tentang.controller");
const router = express.Router();

router.get("/tentang/big", getBigImage);

router.post("/tentang/big", uploadBigImageMiddleware, uploadBigImage);

router.get("/tentang/small", getSmallImage);

router.post("/tentang/small", uploadSmallImageMiddleware, uploadSmallImage);

router.get("/tentang/visi", getVisi);

router.put("/tentang/visi", updateVisi);

router.get("/tentang/misi", getMisi);

router.post("/tentang/misi", postMisi);

router.put("/tentang/misi/:id", updateMisi);

router.delete("/tentang/misi/:id", deleteMisi);

module.exports = router;