// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log(function () {}.hasOwnProperty("prototype")); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log({}.hasOwnProperty("prototype")); // false

// arrow-function : non-constructor
const Person = (name) => {
	this.name = name;
};

console.log(Person.hasOwnProperty("prototype")); // false
console.log(Person.prototype); // undefined

// ES6 메서드 축약 표현 : non-constructor
const obj = {
	foo() {},
};

console.log(obj.foo.hasOwnProperty("prototype")); // false
console.log(obj.foo.prototype); // undefined
