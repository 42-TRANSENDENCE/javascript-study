const obj = {};
const parent = { x: 1 };

Object.getPrototypeOf(obj); // obj.__proto__;

Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x);
