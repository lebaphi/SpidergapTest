/**
 * We'd like to contact partners with offices within 100km of central London (coordinates 51.515419, -0.141099) to invite them out for a meal.
 * Write a NodeJS/JavaScript program that reads our list of partners (download partners.json here) and outputs the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending).
 * You can use the first formula from this Wikipedia article to calculate distance. Don't forget to convert degrees to radians! Your program should be fully tested too.
 */
const {getDistanceByCoordinates} = require('./utils');

// default distance 100km, default location london
const findPartnersByDistance = (partners = [], distance = 100, point = {lat: 51.515419, lon: -0.141099}) => {
  return partners
          .reduce((prevValue, partner) => {
            const formatPartner = {};
            formatPartner.offices = partner.offices.filter(office => {
              const point2 = getCoordinates(office.coordinates);
                // is in range return partner
                if (getDistanceByCoordinates(point, point2) < distance) {
                  formatPartner.organization = partner.organization;
                  return office;
                } 
            });

            if (formatPartner.offices.length > 0) {
              prevValue.push(formatPartner);
              return prevValue;
            } else {
              return prevValue;
            }          
          }, []);
}

const orderPartnersByName = (partners = []) => {
  return partners.sort((partnerA, partnerB) => {
    const nameA = partnerA.organization.toLowerCase();
    const nameB = partnerB.organization.toLowerCase();

    // sort use merge sort and is base in Unicode points
    return (nameA < nameB) ? -1 
          : (nameA > nameB) ? 1 
          : 0;
  });
}

const displayPartners = (partners = []) => {
  return partners.forEach(partner => {
    console.log(JSON.stringify(partner, null, 2));
  });
}

// convert the string into object with lat and lon properties
function getCoordinates(coordinatesString) {
  const point = {};

  // avoid more than 2 divisions
  const coordinates = coordinatesString.split(',', 2);
  point.lat = coordinates[0];
  point.lon = coordinates[1];

  return point;
}

module.exports = {
  findPartnersByDistance,
  orderPartnersByName,
  displayPartners
}