export function GetIndex(array: any, field: string, value: any): number{
    var index = -1;
    array.forEach((p: any, pi: number) => {
        if(p[field] == value)
            index = pi;
    })
    return index
}

export function Remove(array: any, field: string, value: any){
    array.splice(exports.GetIndex(array, field, value), 1);
}

export function RemoveAtIndex(array: any, index: number){
    array.splice(index, 1);
}

export function Contains(array: any, field: string, value: any): boolean{
    return exports.GetIndex(array, field, value) > -1;
}