/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    const propValueMap = new Map();
    if (!obj) return;
    for (const [key, value] of Object.entries(obj)) {
        propValueMap.set(value, key);
    }
    return Object.fromEntries(propValueMap.entries());
}
