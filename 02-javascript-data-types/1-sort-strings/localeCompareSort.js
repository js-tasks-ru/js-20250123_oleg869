function sortStrings(arr, sortSpec) {
    let tempComparePosition = null;
    let tempPosition = null;
    let arrOut = new Array();
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
    for(let i = 0; i < arr.length; i++){
        arrOut.push(arr[i]);
    }
    return arrOut;
}
//
const aray = ['b', 'c', 'a'];
console.log("обычный массив");
for (let i = 0; i < aray.length; i++) {
    console.log(aray[i]);
}
const arrCopy = [...aray];
console.log("копия");
for (let i = 0; i < arrCopy.length; i++) {
    console.log(arrCopy[i]);
}
const sorted = sortStrings(aray);
console.log("отсортированный");
for (let i = 0; i < sorted.length; i++) {
    console.log(sorted[i]);
}
//expect(arr === sorted).toBeFalsy();
//expect(arr).toEqual(arrCopy);
console.log(aray === sorted);
console.log(aray === arrCopy);