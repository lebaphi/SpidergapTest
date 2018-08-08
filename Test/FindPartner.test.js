const expect = require('expect');
const {getDistanceByCoordinates} = require('../FindPartners/utils');
const {
  findPartnersByDistance,
  orderPartnersByName
} = require('../FindPartners/FindPartner');

const allPartners = require('../FindPartners/partners');
const londonPoint = {
  lat: 51.515419,
  lon: -0.141099
}
const otherPoint = {
  lat: 51.5246113,
  lon: -0.07968418
} 

describe('Find Partners', () => {
  
  describe('#findPartnersByDistance', () => {
    it('should find partners within 100km from center london with default values', () => {
      const partners = findPartnersByDistance(allPartners);
      expect(partners.length).toBe(2);
    });

    it('should return an empty array when no arguments was given', () => {
      const partners = findPartnersByDistance();
      expect(partners.length).toBe(0);
    });

    it('should find partners within a given range', () => {
      const partners = findPartnersByDistance(allPartners, 300);
      expect(partners.length).toBe(4);
    });
  });

  describe('#orderPartnersByName', () => {
    it('should sort partners by company name ascending', () => {
      const partners = orderPartnersByName(allPartners);
      expect(partners[0].organization).toBe('Ask Leadership');
      expect(partners[1].organization).toBe('Balance at Work');
    });

    it('should return an empty array if no array was given', () => {
      const partners = orderPartnersByName();
      expect(partners.length).toBe(0);
    });
  });

  describe('#getDistanceByCoordinates', () => {
    it('should return distance in km between 2 points', () => {
      const distance = getDistanceByCoordinates(londonPoint, otherPoint);
      expect(distance).toBeA('number').toBe(4.370500506084861);
    });

    it('should return 0 if no points was given', () => {
      const distance = getDistanceByCoordinates();
      expect(distance).toBeA('number').toBe(0);
    })
  });
});

