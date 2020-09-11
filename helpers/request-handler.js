let fetch = require("node-fetch");
let GetDistanceFromCoords = require("./haversine");
require("dotenv").config();

const GetDataFromAPI = async () => {
  const { API_URL } = process.env;
  const response = await fetch(API_URL);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw Error("An error occurred while trying to fetch data");
  }
};

const DataHandler = async (req, data, distance) => {
  const initialCoords = req.app.locals.initialCoordinates;
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

module.exports = {
  GetDataFromAPI,
  DataHandler,
};
