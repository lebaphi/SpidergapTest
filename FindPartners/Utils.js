const pipe = (...functions) => data => 
    functions.reduce((value, func) => func(value), data)

const getDistanceByCoordinates = (point1 = {lat: 0, lon: 0}, point2 = {lat: 0, lon: 0}) => {
  const R = 6371; // radius of the sphere
  const dLat = deg2rad(point2.lat-point1.lat);
  const dLon = deg2rad(point2.lon-point1.lon);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance; 
}

// private function
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  getDistanceByCoordinates,
  pipe
}