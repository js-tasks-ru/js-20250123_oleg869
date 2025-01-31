/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    let symbolSet = new Set();
    if (typeof arr !== "undefined") {
        for (let elem of arr) {
            symbolSet.add(elem);
        }
    }
    let outPut = new Array();
    for (let elem of symbolSet.values()) {
        outPut.push(elem);
    }
    return outPut;
}
