var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  if (req.body && req.body.distance) {
    res.send("i have it");
  } else {
    req.app.locals.errorsContext = {
      errors: {
        missingParamError: "You cannot force submit this form empty",
      },
    };
    res.redirect("/");
  }
});

module.exports = router;
