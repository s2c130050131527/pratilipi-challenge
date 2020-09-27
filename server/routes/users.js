import passport from "passport";
import express from "express";
var router = express.Router();

/* GET users listing. */
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

module.exports = router;
