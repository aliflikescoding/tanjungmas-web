const express = require("express");
const {getLayananCategory,
  postLayananCategory,
  updateLayananCategory,
  deleteLayananCategory,} = require("../controllers/layanan.controller");

const router = express.Router();

router.get("/layanan/category", getLayananCategory);

router.post("/layanan/category", postLayananCategory);

router.put("/layanan/category/:id", updateLayananCategory);

router.delete("/layanan/category/:id", deleteLayananCategory);

module.exports = router;