/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
    const arrOut = [...arr];
    const sortAsc = (a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" })
    const sortDesc = (a, b) => b.localeCompare(a, ['ru', 'en'], { caseFirst: "upper" })
    return arrOut.sort(param === "asc" ? sortAsc : sortDesc);
}