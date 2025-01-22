const express = require("express");
const {
  getLayananCategory,
  postLayananCategory,
  updateLayananCategory,
  deleteLayananCategory,
  getLayananTextBasedOnCategory,
  getLayananText,
  postLayananText,
  updateLayananText,
  deleteLayananText,
} = require("../controllers/layanan.controller");

const router = express.Router();

router.get("/layanan/category", getLayananCategory);

router.post("/layanan/category", postLayananCategory);

router.put("/layanan/category/:id", updateLayananCategory);

router.delete("/layanan/category/:id", deleteLayananCategory);

router.get("/layanan/category/:id/text", getLayananTextBasedOnCategory);

router.get("/layanan/text", getLayananText);

router.post("/layanan/text", postLayananText);

router.put("/layanan/text/:id", updateLayananText);

router.delete("/layanan/text/:id", deleteLayananText);

module.exports = router;
