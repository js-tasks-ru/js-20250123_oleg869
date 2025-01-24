function sortStrings(arr, sortSpec) {
    let tempPosition = null;
    let upperSymbolArr = arr.filter((word) => word.slice(0, 1) === word.slice(0, 1).toUpperCase());
    if (upperSymbolArr.length != 0) arr = arrayToLowerCase(arr);
    let badSymbolArr = arr.filter((word) => word.slice(0, 1) === ('ё' || 'Ё'));
    if (badSymbolArr.length != 0) arr = replaceBadSymbol(arr);

    if (sortSpec === 'desc') {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[k].slice(0, 1) < arr[i].slice(0, 1)) {
                    tempPosition = arr[i];
                    arr[i] = arr[k];
                    arr[k] = tempPosition;
                }
            }
        }
        if (badSymbolArr.length != 0) arr = restoreBadSymbol(arr, badSymbolArr);
        if (upperSymbolArr.length != 0) arr = restoreArrayUpperCase(arr, upperSymbolArr);
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[k].slice(0, 1) > arr[i].slice(0, 1)) {
                    tempPosition = arr[i];
                    arr[i] = arr[k];
                    arr[k] = tempPosition;
                }
            }
        }
        if (badSymbolArr.length != 0) arr = restoreBadSymbol(arr, badSymbolArr);
        if (upperSymbolArr.length != 0) arr = restoreArrayUpperCase(arr, upperSymbolArr);
    }
    return arr;

    function replaceBadSymbol(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].slice(0, 1) === "ё") {
                arr[i] = arr[i].replace('ё', 'е');
            }
        }
        return arr;
    }

    function restoreBadSymbol(arr, badSymbolArr) {
        for (let i = 0; i < badSymbolArr.length; i++) {
            let param = badSymbolArr[i].replace('ё', 'е');
            let badIndex = arr.indexOf(param);
            arr[badIndex] = arr[badIndex].replace('е', 'ё');
        }
        return arr;
    }

    function arrayToLowerCase(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].slice(0, 1) === arr[i].slice(0, 1).toUpperCase()) {
                arr[i] = arr[i].toLowerCase();
            }
        }
        return arr;
    }

    function restoreArrayUpperCase(arr, upperSymbolArr) {
        for (let i = 0; i < upperSymbolArr.length; i++) {
            //найти слово из списка и им заменить
            let param = upperSymbolArr[i].toLowerCase();
            let badIndex = arr.indexOf(param);
            let letter = arr[badIndex].slice(0, 1).toUpperCase();
            arr[badIndex] = letter + arr[badIndex].substring(1);
        }
        return arr;
    }
}