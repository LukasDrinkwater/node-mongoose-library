var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/profile", function (req, res, next) {
  res.send("profile page");
});

router.get("/cool", function (req, res, next) {
  res.render("cool", { title: "You're so cool" });
});

module.exports = router;
