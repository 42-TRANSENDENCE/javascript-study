/**
 * key : 프로퍼티 키를 나타내는 문자열
 * object : 객체로 평가되는 표현식
 */
const person = {
	name: "Kim",
	address: "Seoul",
};

console.log("name" in person); // true
console.log("address" in person); // true
console.log("age" in person); // false
// in 연산자는 person 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 toString 프로퍼티를 검색한다.
// in 연산자 대신 ES6의 Reflect.has 메서드를 사용 가능하다.
// Object.prototype.hasOwnProperty 메서드도 대신 사용 가능하다. 대신 상속받은 프토토타입의 프로퍼티 키인 경우 false
console.log("toString" in person); // true

// 객체의 모든 프로퍼티를 순회하며 열거하려면 for...in문을 사용한다.
// for...in 문은 상속받은 프로토타입의 프로퍼티까지 열거한다.
// 하지만 Object.prototype의 메서드들이 나열되지 않았다. (e.g. toString)
// toString 메서드가 [[Enumerable]]의 값이 false이기 때문에 열거되지 않는다.
for (const key in person) {
	console.log(`${key} : ${person[key]}`);
}

person.__proto__ = { age: 20 };

console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));
