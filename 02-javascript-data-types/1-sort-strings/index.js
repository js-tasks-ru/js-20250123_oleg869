/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, sortSpec) {
    let tempComparePosition = null;
    let tempPosition = null;
    if (sortSpec === 'desc') {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length; k++) {
                tempPosition = arr[k].localeCompare(arr[i], ['ru', 'en'], { caseFirst: "upper" });
                if (tempPosition === -1) {
                    tempComparePosition = arr[i];
                    arr[i] = arr[k];
                    arr[k] = tempComparePosition;
                }

            }
        }
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length; k++) {
                tempPosition = arr[k].localeCompare(arr[i], ['ru', 'en'], { caseFirst: "upper" });
                if (tempPosition === 1) {
                    tempComparePosition = arr[i];
                    arr[i] = arr[k];
                    arr[k] = tempComparePosition;
                }

            }
        }
    }
    return arr;
}