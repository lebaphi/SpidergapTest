/**
 * Question 1:
 * Write a function called deepClone which takes an object and creates a copy of it. 
 * e.g. {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} -> {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}
 */

 /**
  * Option 1
  * For simple JSON object, this is fastest way
  */
 const deepCloneSimple = ( oldObj = {} ) => JSON.parse(JSON.stringify(oldObj));


/**
 * Options 2
 * Using jQuery
 * Need to include jQuery library
 * argument 1 must set to "true" to enable deep clone
 */
const deepCloneJQuery = ( oldObj = {} ) => jQuery.extend(true, {}, oldObj);

/**
 * Option 3
 * If you are using angular, can use angular.copy()
 */
const deepCloneAngular = ( oldObj = {} ) => angular.copy(oldObj);

/**
 * Option 4
 * Write by yourself
 * @param {*} oldObject 
 */
const deepClone = ( oldObject = {} ) => {
    var cloneObject;
    if (typeof oldObject !== 'object'){
        return oldObject;
    }
    if (oldObject instanceof Date){
        cloneObject = new Date();
        cloneObject.setTime(oldObject.getTime());
        return cloneObject;
    }

    cloneObject = oldObject.constructor();
    for (var key in oldObject) {
        cloneObject[key] = deepClone(oldObject[key]);
    }
    return cloneObject;
}

/**
 * Option 5
 * Use lodash library
 * Document at https://lodash.com/docs/#cloneDeep
 */

module.exports = {
    deepClone : deepClone,
    deepCloneSimple: deepCloneSimple
};