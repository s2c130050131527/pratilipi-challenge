var express = require("express");
import passport from "passport";
var router = express.Router();

router.get("/auth/google/callback", passport.authenticate("google"));

module.exports = router;
