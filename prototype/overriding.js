const Person = (function () {
	function Person(name) {
		this.name = name;
	}

	Person.prototype.sayHello = function () {
		console.log(`Hi! My name is ${this.name}`);
	};

	return Person;
})();

const me = new Person("Kim");

me.sayHello = function () {
	console.log(`Hey! My name is ${this.name}`);
};

me.sayHello(); // Hey! My name is Kim

delete me.sayHello; // 인스턴스 프로퍼티를 삭제한다.

me.sayHello(); // Hi! My name is Kim

// 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
delete me.sayHello; // 프로토타입 프로퍼티를 삭제한다? x

me.sayHello(); // Hi! My name is Kim
