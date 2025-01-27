/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    let splitArray = path.split('.');
    return function (inputObject) {
        const getInnerObject = (obj, arrayElement) =>
            Object.hasOwn(obj, arrayElement) ? obj[arrayElement] : undefined
        function getValue(inputObject, counter) {
            inputObject = getInnerObject(inputObject, splitArray[counter]);
            if (inputObject != null && counter < splitArray.length - 1) {
                counter = counter + 1;
                return getValue(inputObject, counter);
            } else return inputObject
        }
        return getValue(inputObject, 0);
    }
}
