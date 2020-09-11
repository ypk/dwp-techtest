const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const requestRateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 10,
  onLimitReached: function (req, res, options) {
    res.render("error", {
      error: {
        status: 429,
      },
      message: "Too Many Requests",
    });
  },
});
 
const requestSpeedLimit = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 5,
  delayMs: 500
});

const { GetDataFromAPI, DataHandler } = require("../helpers");

const myCache = new NodeCache({ stdTTL: 120, checkperiod: 130 });

router.post("/", requestRateLimiter, requestSpeedLimit, async function (req, res, next) {
  if (req.body && req.body.distance) {
    const { distance } = req.body;

    let response = {};

    if (myCache.has("response")) {
      response = await myCache.get("response");
    } else {
      const userData = await GetDataFromAPI();
      const result = await DataHandler(req, userData, distance);
      response = {
        distance,
        result,
      };
      await myCache.set("response", response);
    }
    req.app.locals.responseContext = {
      response,
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
