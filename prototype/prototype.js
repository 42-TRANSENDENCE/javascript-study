// 생성자 함수
function Circle(radius) {
	this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용
// prototype은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
	return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.14...
console.log(circle2.getArea()); // 12.56...

function Person(name) {
	this.name = name;
}

const me = new Person("Lee");
console.log(Person.prototype === me.__proto__); // true
console.log(me.constructor === Person); // true
