import pkg from "lodash";
const {gt,toNumber,isSymbol,baseTrim} = pkg;
let a = "0.1.1.bast1";
let b = "0.1.1.bast2"

console.log(gt(a, b))
console.log(te1(a, b))

console.log(a1(a))
console.log(typeof a, typeof b)

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

console.log(+a,+b, +a > +b)

function te1(a,b) {
    const max = Math.max(a.length, b.length);
    for (var i = 0; i < max; i++) {
        if (a[i] != b[i]) {
            return a[i] > b[i];
        }
    }
}

// function isObject(value) {
//     var type = typeof value;
//     return value != null && (type == 'object' || type == 'function');
// }

function a1(value) {
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
    //   value = baseTrim(value);
    // console.log(value)
}

function gt1(a, b) {
    if (!(typeof a == 'string' && typeof b == 'string')) {
        console.log(123123)
        value = toNumber(value);
        other = toNumber(other);
      }   
      return  a > b;
      console.log(3333)
}
  
