// -----------------------------------------------------------
// Polyfill for Map, Filter and Reduce

Array.prototype.myMap = function (cb) {
    let tempArr = [];
    for (let i = 0;i<this.length;i++) {
        tempArr[i] = cb(this[i], i, this);
    }
    return tempArr;
}

let arr = [1, 2, 3, 5];

let temp = arr.myMap((ele, index) => {
    return ele * index;
});

console.log('temp = ', temp);

Array.prototype.myFilter = function (cb) {
    let tempArr = [];
    for (let i = 0;i<this.length;i++) {
        if (cb(this[i], i, this)) {
            tempArr.push(this[i]);
        }
    }
    return tempArr;
}

let temp2 = arr.myFilter((ele, index) => {
    return ele % 2;
});

console.log('temp2 = ', temp2);

Array.prototype.myReduce = function (cb, initialValue) {
    let result;
    for (let i = 0;i<this.length;i++) {
        if (i == 0) {
            result = initialValue ? cb(initialValue, this[i], i, this) : this[i];
        } else {
            result = cb(result, this[i]);
        }
    }
    return result;
}

const myFunc = (acc, curr) => {
    return acc + curr;
}

let arr3 = [2, 3, 4, 5];
let value = arr3.myReduce(myFunc, 100);

console.log('value = ', value);



// ------------------------------------------------------------------------------------------------
// PolyFill for Call, Apply and bind


Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    const key = '__fnKey__';
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}

const obj1 = {
    name: "Shubham Agarwal",
    age: 29,
};

const obj2 = {
    name: "Kapil Agarwal",
    age: 33,
    details: function (a, b) {
        console.log('Name is ' + this.name + ' and age is ' + this.age + a + b);
    },
};

obj2.details.myCall(obj1, " a ", " b ");

Function.prototype.myApply = function (context, args) {
    context = context || window;
    const key = '__fnKey__';
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}

obj2.details.myApply(obj1, [" a ", " b "]);

const detFunc = function (a, b) {
    console.log('Name is ' + this.name + ' and age is ' + this.age + a + b);
};

Function.prototype.myBind = function (context, ...args) {
    context.fn = this;
    return function (...args2) {
        context.fn(...args, ...args2);
    }
}

let detailsWithBind = obj2.details.myBind(obj1, " c ");
detailsWithBind("b");





