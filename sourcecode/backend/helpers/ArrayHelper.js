exports.GetIndex = (array, field, value) => {
    var index = -1;
    array.forEach((p, pi) => {
        if(p[field] == value)
            index = pi;
    })
    return index
}

exports.Remove = (array, field, value) => {
    array.splice(exports.GetIndex(array, field, value), 1);
}

exports.Contains = (array, field, value) => {
    return exports.GetIndex(array, field, value) > -1;
}