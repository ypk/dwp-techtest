"use strict";

const Deg2Rad = (deg) => deg * (Math.PI / 180);

const GetDistanceFromCoords = (initialCoords, FinalCoords) => {
  const { latitude: initialLat, longitude: initialLng } = initialCoords;
  const { latitude: finalLat, longitude: finalLng } = FinalCoords;

  if (initialLat === finalLat && initialLng === finalLng) {
    return 0;
  }

  const earthRadius = 6371;

  const distanceLat = Deg2Rad(finalLat - initialLat);
  const distanceLng = Deg2Rad(finalLng - initialLng);

  const cosinesProduct =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(Deg2Rad(initialLat)) *
      Math.cos(Deg2Rad(initialLat)) *
      Math.sin(distanceLng / 2) *
      Math.sin(distanceLng / 2);

  const distance =
    2 * Math.atan2(Math.sqrt(cosinesProduct), Math.sqrt(1 - cosinesProduct));
  return earthRadius * distance;
};

module.exports = GetDistanceFromCoords;
