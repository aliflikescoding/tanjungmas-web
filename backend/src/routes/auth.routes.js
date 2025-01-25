const express = require("express");

const {
  auth
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/auth", auth);

module.exports = router;
