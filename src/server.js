const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const GetDistanceFromCoords = require("./common/Haversine");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 8081;
const apiUrl = `${process.env.API_URL}/users`;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

const serveError = (res, msg = "Hello?!") => {
  res.status(200).send(msg);
};

const GetDataFromAPI = async () => {
  const { API_URL } = process.env;
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
};

const DataHandler = async (data, distance) => {
  const initialCoords = { latitude: 51.509865, longitude: -0.118092 };
  const result = [];
  data.forEach((user) => {
    let userCoords = {
      latitude: user.latitude,
      longitude: user.longitude,
    };
    let calculatedDistance = GetDistanceFromCoords(initialCoords, userCoords);
    if (calculatedDistance <= distance) {
      result.push(user);
    }
  });
  return result;
};

app.post("/calculate", async (req, res, next) => {
  const params = req.body || {};
  if (Object.keys(params).length > 0) {
    try {
      const { distance } = params;

      const userData = await GetDataFromAPI();
      const result = await DataHandler(userData, distance);

      res.json(result);
    } catch (e) {
      console.error(e);
    }
  } else {
    serveError(res, "Hmm, not quite right.");
  }
});

app.get("*", (req, res, next) => {
  serveError(res);
});
