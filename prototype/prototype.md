# Prototype

자바스크립트는 명령형(Imperative), 함수형(funtional), 프로토 타입 기반(prototype-based), 객체지향 프로그래밍(OOP)을 지원하는 멀티 패러다임 프로그래밍 언어이다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체이다.

원시 타입(primitive type)의 값을 제외한 나머지 값들은 모두 객체이다.

## 객체지향 프로그래밍

속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라고 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 추상화(abstraction)라고 한다.

e.g. 사람은 이름, 나이, 주민번호, 성별, 등등이 있지만 프로그램에 이름, 나이만 필요.

객체 : 상태 데이터(property)와 동작(method)을 하나의 논리적인 단위로 묶은 복합적인 자료구조

### 상속과 프로토타입

상속(inheritance)은 어떤 객체의 property 또는 method를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 코드의 재사용

생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하다.

생성자 함수는 인스턴스를 생성할 때마다 생성자 함수 안에 정의된 내용을 생성하고 모든 인스턴스가 중복 소유하게 된다.

자바스크립트는 prototype을 기반으로 상속을 구현한다.

생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위 객체인 프로토타입 자산을 공유하여 사용할 수 있다.

### Prototype 객체

프로토타입 객체란 객체 간 상속을 구현하기 위해 사용한다.

프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(+메서드)를 제공한다.

프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자유롭게 상용할 수 있다.

모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 참조(null일수도 있다)이다.

#### 내부 슬롯(internal slot)과 내부 메서드(internal method)

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo property)와 의사 메서드(pseudo method)다.

ECMAScript 사양에 등장하는 이중 대괄호 `[[]]`로 감싼 이름들이 내부 슬롯과 내부 메서드다.

e.g. 객체 리터럴에 의해 생성된 객체의 프로토타입 : Object.prototype, 생성자 함수에 의해 생성된 객체의 프로토타입 : 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있는 객체

인스턴스는 `[[Prototype]]` 내부 슬롯에 직접 접근할수는 없고, `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.

prototype은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 prototype 프로퍼티를 통해 프로퍼티에 접근할 수 있다.

### `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯에 간접적으로 접근 가능하다.

접근자 프로퍼티는 자체적으로 값(`[[Value]]` 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 떄 사용하는 접근자 함수 (accessor function), 즉 `[[Get]]` `[[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.property의 프로퍼티이다.

모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티를 사용할 수 있다.

프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서이다.

포로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.

순환 참조(circular reference)하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 떄문에 무한루프에 빠진다.

`__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체할 수 있다.

`__proto__`는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었고, ES6에서 표준으로 채택되었다.

현대 대부분의 브라우저가 `__proto__`를 지원하지만 코드 내에서 직접 사용하는 것은 권장되지 않는다.

직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문이다.

`__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우 `Object.getPrototypeOf` 메서드를, 프로토타입을 교체하고 싶은 경우 `Object.setPrototypeOf` 메서드를 사용할 것을 권장한다.

`Object.getPrototypeOf` 메서드는 ES5, `Object.setPrototypeOf` 메서드는 ES6에 도입되었다.

### 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입을 생성하지 않는다.

모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.

| 구분                      | 소유        | 값                | 사용 주체   | 사용 목적                                                          |
| :------------------------ | :---------- | :---------------- | :---------- | :----------------------------------------------------------------- |
| **proto** 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용            |
| prototype 프로퍼티        | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용 |

리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재한다. 하지만 리터럴 표기법에 의해 생서된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 pair로 존재한다.

### 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 생성된다.

#### 사용자 정의 생성자 함수의 프로토타입 생성 시점

생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 생성된다.

non-constructor는 프로토타입이 생성되지 않는다.

함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다.

함수 선언문으로 정의된 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다.

이때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된다.

프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다. (e.g. Object.prototype)

#### 빌트인 생성자 함수의 프로토타입 생성 시점

빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.

객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다.

이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다.

### 생성자 함수에 의해 생성된 객체의 프로토타입

프로토타입은 객체다. 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다.

이렇게 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.

### 프로토타입 체인

Person 생성자 함수에 의해 생성된 인스턴스인 me는 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있다.

이것은 me가 Object.prototype도 상속받았다는 것을 의미한다.

me 객체의 프로토타입은 Person.prototype이다.

Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.

자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.

이를 프로토타입 체인이라고 한다.

프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다.

Object.prototype을 프로토타입의 종점 (end of prototype chain)이라 한다.

Object.prototype의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯의 값은 null이다.

Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다.

스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용한다.

### 오버라이딩과 프로퍼티 섀도잉

프로토타입이 소유한 프로퍼티 : 프로토타입 프로퍼티

인스턴스가 소유한 프로퍼티 : 인스턴스 프로퍼티

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 인스턴스 프로퍼티로 추가한다.

인스턴스의 메서드는 프로토타입의 메서드를 오버라이딩했고, 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 property shadowing이라고 한다.

프로퍼티를 삭제하는 경우도 마찬가지로 작동한다.

하지만 삭제의 경우 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하려는 것은 불가능하다.

즉, 하위 객체를 통해 프로토타입에 get 은 허용되나 set은 허용되지 않는다.

자바스크립트는 오버로딩을 지원하지 않는다. 대신 arguments 객체를 이용하여 구현할 수 있다.

### 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다.

부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. -> 객체 간의 상속 관계를 동적으로 변경할 수 있다.

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.

`__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

프로토타입으로 교체한 객체에는 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.

따로 지정해 주어야 다시 연결을 할 수 있다. 프로토타입은 직접 교체하지 않는 것이 좋다.

### instanceof 연산자

객체 instanceof 생성자 함수

우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true / 그렇지 않으면 false를 반환한다.

constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.

### 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.

Object.create는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다.

객체를 생성하면서 상속을 구현하는 것

-   new 연산자 없이도 객체를 생성할 수 있다.
-   프로토타입을 지정하면서 객체를 생성할 수 있다.
-   객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

Object.prototype 빌트인 메서드를 직접 호출하는 것은 권장하지 않는다.

Object.create 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성 가능하기 때문

```javascript
Object.prototype.hasOwnProperty.call(obj, "name");
```

이렇게 호출하는 것이 좋다.

### 정적 프로퍼티 / 메서드

정적(static) 프로퍼티 / 메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드이다.

생성자 함수는 객체이므로 자신의 프로퍼티 / 메서드를 소유할 수 있다.

Person 생성자 함수 객체가 소유한 프로퍼티 / 메서드를 정적 프로퍼티 / 메서드라고 한다.

정적 프로퍼티 / 메서드는 생성자 함수가 생성한 인스턴스로 참조 / 호출할 수 없다.

### 기타 키워드

for ... in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 true인 프로퍼티를 순회하며 열거한다.

for ... in 문은 프로퍼티 키가 Symbol인 프로퍼티는 열거하지 않는다.

for ... in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다.

객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys / values / entries 메서드를 이용한다.

Object.keys : 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.

Object.values(ES8) : 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환한다.

Object.entires(ES8) : 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환한다.
