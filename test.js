let number;
if(number === undefined) {
    console.log('number is undefined')
}

let obj = {}
if(obj['key'] === undefined) {
    console.log('key is undefined')
    obj['new_key'] = '5';
}
console.log(obj);
let stars = Math.random();
stars = String((Number(stars) + 3.5).toFixed(1));
console.log(typeof stars);