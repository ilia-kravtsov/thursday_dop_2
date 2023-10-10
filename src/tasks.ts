const getLastItem = <T>(array: Array<T>) => {
    return array[array.length-1]
}

const res_1 = getLastItem(['1', '2', '3', '4'])
const res_2 = getLastItem([1, 2, 3, 4])