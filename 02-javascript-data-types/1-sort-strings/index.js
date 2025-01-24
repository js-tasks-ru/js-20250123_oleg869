/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param="asc") {    
    let tempComparePosition = null;
    let tempPosition = null;
    let arrOut = new Array();
    for(let i = 0; i < arr.length; i++){
        arrOut.push(arr[i]);
    }  
    if (param === 'desc') {
        for (let i = 0; i < arrOut.length; i++) {
            for (let k = 0; k < arrOut.length; k++) {
                tempPosition = arrOut[k].localeCompare(arrOut[i], ['ru', 'en'], { caseFirst: "upper" });
                if (tempPosition === -1) {
                    tempComparePosition = arrOut[i];
                    arrOut[i] = arrOut[k];
                    arrOut[k] = tempComparePosition;
                }                

            }
        }
    }
    else {
        for (let i = 0; i < arrOut.length; i++) {
            for (let k = 0; k < arrOut.length; k++) {
                tempPosition = arrOut[k].localeCompare(arrOut[i], ['ru', 'en'], { caseFirst: "upper" });
                if (tempPosition === 1) {
                    tempComparePosition = arrOut[i];
                    arrOut[i] = arrOut[k];
                    arrOut[k] = tempComparePosition;
                }
            }
        }
    }    
    return arrOut;
}