# **Closure**

## **1. 스코프**

**스코프(Scope)** 란 변수를 참조(접근)할 수 있는, 또는 식별자(변수, 함수, 클래스 이름)가 유효한 범위이다. 따라서 스코프는 선언된 위치에 따라 유효 범위가 결정된다. 블록(`{}`) 안에서의 변수는 블록 안에서만 유효한 것이다. 스코프가 존재하는 이유는 식별자의 이름 충돌을 방지해주고, 유효 범위를 지정하여 메모리를 절약해주기 때문이다. 따라서 식별자는 최대한 필요한 곳에서 정의를 해야한다. 블록 안에서 선언한 식별자는 블록 내부에서만 존재하고 블록이 끝나면 Garbage Collector에 의해 소멸됨으로써 메모리가 효율적으로 관리된다.

> **MDN 정의**
>
> The **scope** is the current context of execution in which values and expressions are "visible" or can be referenced.

**스코프의 잘못된 예제**

```js
function exampleFunction() {
  const x = "declared inside function"; // x can only be used in exampleFunction
  console.log("Inside function");
  console.log(x);
}

console.log(x); // Causes error
```

**스코프의 올바른 예제**

```js
const x = "declared outside function";

exampleFunction();

function exampleFunction() {
  console.log("Inside function");
  console.log(x);
}

console.log("Outside function");
console.log(x);
```

블록은 `let`, `const`의 선언만 스코프하고 `var` 선언은 스코프하지 않는다.

```js
{
  var x = 1;
}
console.log(x); // 1
```

```js
{
  const x = 1;
}
console.log(x); // ReferenceError: x is not defined
```

&nbsp;

## **2. 실행 컨텍스트 & 렉시컬 환경**

자바스크립트 런타임 환경(JavaScript Runtime Environment)에는 콜스택(Call Stack)이 있다. 이 콜스택을 통해서 코드의 실행 순서를 기억한다. 자바스크립트 엔진(JavaScript Engine)에는 단 하나의 싱글 컨텍스트(실행 컨텍스트) 스택이 있다. 따라서 한번에 하나의 일만 처리할 수 있다.

**실행 컨텍스트(Execution Context)** 는 코드의 실행 순서와 스코프를 기억한다. 그리고 각각의 블록은 **렉시컬 환경(Lexical Environment)** 라는 내부 오브젝트를 가지고 있고 그 내부는 두 가지로 나뉜다.

**렉시컬 환경(Lexical Environment)**
* **환경 레코드(Environment Record)** : 현재 블록에 해당하는 정보
* **외부 환경 참조(Outer Lexical Environment Reference)** : 부모에 대한 정보

```js
// 전역 스코프
const num = 1;
console.log(num);      // 1
{ // 블록1 스코프
  const num = 2;
  console.log(num);    // 2
  { // 블록2 스코프
    const num = 3;
    console.log(num);  // 3
  }
}
```

```
|            |
|  블록2 스코프 |
|  렉시컬 환경  |
|____________|
|            |
|  블록1 스코프 |
|  렉시컬 환경  |
|____________|
|            |
|  전역 스코프  |
|  렉시컬 환경  |
|____________|
실행 컨텍스트 스택
```

위 예제에서 코드가 실행이 되면 **전역 스코프 렉시컬 환경**이 만들어 진다. **전역 스코프 렉시컬 환경**에는 `num`이라는 변수(환경 레코드)가 들어있고 외부 환경은 `NULL`을 가르키고(외부 환경 참조) 있다. 그 다음으로 **블록1 스코프 렉시컬 환경**이 만들어진다. 그 안에는 `num`라는 변수가 있고 외부 환경 참조는 `전역 렉시컬 환경`을 가르키고 있다. 이렇게 스코프들이 연결되어 있는 것을 **스코프 체인**이라고 한다. 또 그 다음으로는 **블록2 스코프 렉시컬 환경**이 만들어지고 그 안에는 `num`라는 변수가 있고 외부 환경 참조는 `블록1 렉시컬 환경`을 가르킨다.

> **호이스팅(Hoisting)**
>
> 자바스크립트 엔진(Interpreter)이 코드를 실행하기 전 변수, 함수, 클래스의 선언문을 코드의 최상단으로 끌어올리는 것을 말한다. 이 때, 변수(let, const)와 클래스는 선언과 초기화를 분리한 후 선언만 호이스팅된다.

&nbsp;

## **3. 클로저**

**클로저(Closure)** 는 함수와 그 외부를 둘러싸고 있는 렉시컬 환경의 조합으로 내부 함수에서 외부 함수에 있는 상태에 접근할 수 있는 권한을 주는 것이다.

> **MDN 정의**
>
> A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

위의 스코프 내용에서 내부 블록 스코프 안에서 스코프 체인을 통해 외부에 있는 스코프에 접근이 가능함을 배웠었다. 이번에는 그냥 블록이 아니라 내부 함수에서 외부 함수에 있는 상태에 접근할 수 있는 것을 클로저라고 한다.

**예시**

```js
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();
```

클로저는 내부 정보를 은닉(캡슐화)하고, 공개 함수(외부)를 통한 데이터 조작을 위해 쓰인다. 클래스의 private 필드와 같은 효과를 얻을 수 있는 것이다. 최신 자바스크립트에서는 클래스의 메소드를 private으로 정의할 수 있지만, 태생적으로 자바스크립트는 클래스를 제공하지 않았어서 전에는 클로저를 이용하여 private 메소드를 흉내냈었다.

```js
const makeCounter = function() {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
};

const counter1 = makeCounter();
const counter2 = makeCounter();
console.log(counter1.value());  // 0
counter1.increment();
counter1.increment();
console.log(counter1.value());  // 2
counter1.decrement();
console.log(counter1.value());  // 1
console.log(counter2.value());  // 0
```

위 예제에서 `counter` 객체는 두 개의 private 아이템을 포함한다. 하나는 `privateCounter`라는 변수이고 나머지 하나는 `changeBy`라는 함수이다. 둘 다 함수 외부에서 접근될 수 없다. 대신에 객체로 반환된 세 개의 public 함수를 통해서 접근할 수 있다.

위의 세 가지 퍼블릭 함수는 같은 환경을 공유하는 클로저다. 자바스크립트의 어휘적 유효 범위 덕분에 세 함수 각각 `privateCounter` 변수와 `changeBy` 함수에 접근할 수 있다.

`counter1`과 `counter2`는 각각 독립성을 유지한다. 각 클로저는 그들 고유의 클로저를 통한 `privateCounter` 변수의 다른 버전을 참조한다. 각 카운터가 호출될 때마다, 하나의 클로저에서 변수 값을 변경해도 다른 클로저의 값에는 영향을 주지 않는다. 이런 방식으로 클로저를 사용하여 객체지향 프로그래밍의 정보 은닉과 캡슐화 같은 이점들을 얻을 수 있다.

`ES6`가 출시된 현재는 클로저로 구현된 위 예제를 다음과 같이 클래스로 정의할 수 있다.

```js
class makeCounter {
  #privateCounter = 0;
  #changeBy = (val) => {
      this.#privateCounter += val;
  }
  get value() {
      return this.#privateCounter;
  }
  increment = () => {
      this.#changeBy(1);
  }
  decrement = () => {
      this.#changeBy(-1);
  }
}

const counter1 = new makeCounter();
const counter2 = new makeCounter();
console.log(counter1.value);    // 0
counter1.increment();
counter1.increment();
console.log(counter1.value);    // 2
counter1.decrement();
console.log(counter1.value);    // 1
console.log(counter2.value);    // 0
```

&nbsp;

> **Reference**
> * https://developer.mozilla.org/en-US/docs/Glossary/Scope
> * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
