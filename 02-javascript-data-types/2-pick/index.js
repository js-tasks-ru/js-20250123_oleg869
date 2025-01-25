/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const checkArray = (a, b) => b.indexOf(a) >= 0;
    return Object.fromEntries(
        Object.entries(obj).filter(item => checkArray(item[0], fields))
    );
};
