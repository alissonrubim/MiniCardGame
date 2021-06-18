exports.RemoveItemByField = (array, field, value) => {
    var index = 0;
    array.forEach((p, pi) => {
        if(p[field] == value)
            index = pi;
    })
    array.splice(index, 1);
}