function isUndefined(s) {
    return typeof s === 'undefined';
}

function isFunction(f) {
    return typeof f === 'function';
}

module.exports = {
    isUndefined,
    isFunction,
}