function sortStrings(arr, sortSpec) {
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
//
const arr = ['b', 'c', 'a'];
console.log("обычный массив");
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
const arrCopy = [...arr];
console.log("копия");
for(let i = 0; i < arrCopy.length; i++){
    console.log(arrCopy[i]);
}
const sorted = sortStrings(arr);
console.log("отсортированный");
for(let i = 0; i < sorted.length; i++){
    console.log(sorted[i]);
}
//expect(arr === sorted).toBeFalsy();
//expect(arr).toEqual(arrCopy);