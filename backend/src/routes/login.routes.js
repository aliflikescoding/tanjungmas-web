const express = require("express");

const { adminLogin } = require("../controllers/login.controller.js");

const router = express.Router();

router.post("/login", adminLogin);

module.exports = router;