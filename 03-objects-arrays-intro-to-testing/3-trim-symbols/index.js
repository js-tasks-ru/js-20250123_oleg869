/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let symbolMap = new Map();
    let symbolContainer = '';
    let globalKey = 0;
    const addRecInMap = (symbol) =>{
        symbolContainer = symbolContainer + symbol;
        if(symbolContainer.length <= size) symbolMap.set(globalKey, symbolContainer);
    } 
    const createRecInMap = (symbol) =>{
        symbolContainer = symbol;
        globalKey = globalKey + 1;
        if(symbol.length <= size) symbolMap.set(globalKey, symbolContainer);
    }
    for (let i = 0; i < string.length; i++) {
        symbolContainer[0] === string[i] ? addRecInMap(string[i]) : createRecInMap(string[i]);        
    }
    let result = '';
    for(let elem of symbolMap.values()){
        result = result + elem;
    }
    return typeof size !== "undefined" ? result : string;
}