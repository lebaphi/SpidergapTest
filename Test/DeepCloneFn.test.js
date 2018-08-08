var expect = require('expect');
var deepCloneFn = require('../DeepCloneFn/DeepCloneFn');

//Testing with deep clone
var deepClone = deepCloneFn.deepClone;

var myObject = {
  name: "Paddy",
  address: {
    town: "Lerum",
    country: "Sweden"
  }
};

describe('deepClone function', function () {

  it('should deep clone an object', function(){
    var newObject = deepClone(myObject);
    expect(newObject).toMatch(myObject);

    // We check that the object save the values not the reference.
    newObject.address.country = "UK";
    expect(newObject.address.country).toNotBe(myObject.address.country);
  });

  it('should return empty object when no object inputted', function () {
    var newObject = deepClone();
    expect({}).toMatch(newObject);
  });

  it('should compare success object included function property', function () {
    var objWithFun = {
      name: "Paddy",
      address: {
        town: "Lerum",
        country: "Sweden",
        aFunction: function(){
          return 1;
        }
      },
      aFunction: function(){
        return 1;
      }
    };

    var newObject = deepClone(objWithFun);
    expect(newObject).toMatch(myObject);
  });

  it('should compare date object success', function () {
    const objWithDates = {
      name: "Paddy",
      address: {
        town: "Lerum",
        country: "Sweden",
        aDate: new Date(2018, 08, 01)
      },
      aDate: new Date(2018, 08, 01)
    };

    const newObject = deepClone(objWithDates);
    expect(newObject.aDate).toMatch(new Date(2018, 08, 01));
    expect(newObject.address.aDate).toMatch(new Date(2018, 08, 01));
  });

})