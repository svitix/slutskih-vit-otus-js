import {deepEqual} from "./deepEqual.js";

const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        a: 1,
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};

const obj4 = {
    a: {
        b: [1,2,3],
    },
};

const obj5 = {
    a: {
        b: [1,2],
    },
};

console.log(deepEqual(obj1, obj1));
console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj3, obj4));
console.log(deepEqual(obj4, obj5));
console.log(deepEqual(obj5, null));
console.log(deepEqual([1,2,3], [1,2]))
