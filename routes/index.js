var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const {errorsContext, responseContext} = req.app.locals;
  req.app.locals.errorsContext = null;
  req.app.locals.responseContext = null
  const initialCoords = req.app.locals.initialCoordinates;
  const errors = errorsContext && errorsContext.errors || null;
  const response = responseContext && responseContext.response || null;
  res.render("index", { initialCoords, errors, response });
});

module.exports = router;
