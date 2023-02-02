const Person = (function () {
	function Person(name) {
		this.name = name;
	}

	// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
	// 문제점 : 객체에 constructor 프로퍼티가 없다.
	// 해결방법 : constructor 프로퍼티 추가
	Person.prototype = {
		sayHello() {
			console.log(`Hi My name is ${this.name}`);
		},
		constructor: Person,
	};

	return Person;
})();

const me = new Person("Kim");

me.sayHello();

console.log(me.constructor === Person); // false -> true
console.log(me.constructor === Object); // true -> false

function Phone(number) {
	this.number = number;
}

const myPhone = new Phone("1234");

const parentPhone = {
	call() {
		console.log(`call to ${this.number}`);
	},
	constructor: Phone,
};

Phone.prototype = parentPhone;

Object.setPrototypeOf(myPhone, parentPhone); // myPhone의 construcor

myPhone.call();

console.log(myPhone.constructor === parentPhone); // false -> true
console.log(myPhone.constructor === Object); // true -> flase
