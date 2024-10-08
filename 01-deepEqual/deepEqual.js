export function deepEqual(obj1, obj2, path = '') {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        errorMsg(path)
        return false;
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        errorMsg(path)
        return false;
    }

    for (let key of keys1) {
        const newPath = path ? `${path}.${key}` : key;

        if (!keys2.includes(key)) {
            errorMsg(key)
            return false;
        }

        if (!deepEqual(obj1[key], obj2[key], newPath)) {
            return false;
        }
    }

    return true;
}

function errorMsg(key) {
    const path = key === "" ? "root" : key
    console.error(`Error: ${path}.`);
}
