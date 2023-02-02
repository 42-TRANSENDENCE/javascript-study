let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true

// console.log(obj.toString()); // TypeError: obj.toString is not a function

obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

obj = Object.create(Object.prototype, {
	x: { value: 1, writable: true, enumerable: true, configurable: true },
});
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype);

const myProto = { x: 10 };

// 임의의 객체를 직접 상속받는다.
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

function Person(name) {
	this.name = name;
}
obj = Object.create(Person.prototype);

obj.name = 'Kim';
console.log(obj.name); // Kim
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
console.log(obj.hasOwnProperty('name')); // ture
console.log(obj.propertyIsEnumerable('name')); // true
