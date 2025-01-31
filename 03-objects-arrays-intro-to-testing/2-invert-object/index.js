/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    let propValueMap = new Map();
    if (typeof obj !== "undefined") {
        for (let rec of Object.entries(obj)) {
            propValueMap.set(rec[1], rec[0]);
        }
        let objectOut = Object.fromEntries(propValueMap.entries());
        return objectOut;
    } else return undefined;
}
