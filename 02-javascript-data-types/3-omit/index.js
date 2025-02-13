/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const checkArray = (a, b) => b.indexOf(a) === -1;
    return Object.fromEntries(
        Object.entries(obj).filter(item => checkArray(item[0], fields))
    );
};
