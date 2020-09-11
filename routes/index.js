var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const context = req.app.locals.errorsContext;
  req.app.locals.errorsContext = null;
  const errors = (context && context.errors) || null;
  res.render("index", { errors });
});

module.exports = router;
