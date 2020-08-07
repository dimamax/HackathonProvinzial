function eliminateDuplicates(arr) {
    let i, len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
}

module.exports.uniqid = function(str) {
    let len = str.length;
    let chars = [];
    for (let i = 0; i < len; i++) {

        chars[i] = str[Math.floor((Math.random() * len))];

    }

    let filtered = eliminateDuplicates(chars);

    return filtered.join('');
};