"use strict";
function unique(arr) {
    var obj = {};
    return arr.filter(function (item, index, array) { return obj.hasOwnProperty(typeof item + item) ? false : obj[typeof item + item] = true; });
}
function quickSort(arr) {
    if (arr.length < 2)
        return arr;
    var standard = arr.slice()[0], left = [], right = [];
    for (var i = 1; i < arr.length; i++) {
        if (standard < arr[i]) {
            right.push(arr[i]);
        }
        else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat([standard], quickSort(right));
}
function deepClone(obj) {
    // if(obj instanceof Date) return new Date(obj)
    var hash = new WeakMap();
    if (hash.has(obj))
        return hash.get(obj);
    var res = Array.isArray(obj) ? [] : {};
    hash.set(obj, res);
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (value !== null && typeof value === 'object') {
            res[key] = deepClone(value);
        }
        else if (value instanceof Date) {
            res[key] = new Date(value.valueOf());
        }
        else {
            res[key] = value;
        }
    });
    return res;
}
function binarySearch(arr, target) {
    var left = 0, right = arr.length - 1;
    while (left <= right) {
        var mid = left + ((right - left) >> 1);
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}
console.log(unique([1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6]));
console.log(quickSort(unique([1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6])));
var test = { a: 1, b: { c: 1 }, d: new Date(), reg: /\d/g, arr: [1, 2, 3, 54], date: new Date() };
// test.t = test
console.log(deepClone(test));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 10, 11], 2));
