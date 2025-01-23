const express = require("express");

const {
  adminLogin,
  adminLogout,
} = require("../controllers/login.controller.js");

const router = express.Router();

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

module.exports = router;