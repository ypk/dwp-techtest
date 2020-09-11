const express = require("express");
const router = express.Router();
const {GetDataFromAPI, DataHandler} = require("../helpers"); 

router.post("/", async function (req, res, next) {
  if (req.body && req.body.distance) {
    const { distance } = req.body;
    const userData = await GetDataFromAPI();
    const result = await DataHandler(req, userData, distance);  
    req.app.locals.responseContext = {
      response: {
        distance,
        result
      }
    };
    res.redirect("/");
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
