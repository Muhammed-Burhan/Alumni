const express = require("express");
const router = express.Router();

//controlles
const { login, verify } = require("../controllers/controllers");

router.route("/login").post(login);
router.route("/verify").post(verify);

module.exports = router;
