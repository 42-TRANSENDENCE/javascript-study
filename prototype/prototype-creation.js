console.log(Person.prototype); // {}

function Person(name) {
	this.name = name;
}

// arrow function은 non-constructor이다.
// non-constructor는 프로토타입이 생성되지 않는다.
const Phone = (number) => {
	this.number = number;
};

console.log(Phone.prototype); // undefined
