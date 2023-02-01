why callback? 
ex) 
- 유저 ID를 인자로 받아 DB나 API 연동 없이 임의의 유저 객체를 리턴하는 findUser()라는 함수를 작성해보자.
```js #callback-1
function findUser(id) {
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    return user;
  }
  
  const user = findUser(1);
  console.log("user:", user);
```
- 결과 
```js
user: { id: 1, name: 'User1', email: '1@test.com' }
```
- 위의 코드 같이 우리가 흔히 생각하는 일반적인 함수란 입력(파라미터)이 있고 출력(리턴값)이 있다.
- 하지만 자바스크립트에서는 출력값이 없고 그 대신에 콜백 함수를 입력받는 함수들이 많이 있습니다. 
- 콜백 함수는 다른 함수에 인자로 넘어가서 실행될 로직을 담게 됩니다.
- 이게 무슨 말이나면
```js callback-2
function findUserCallBack(id, cb) {
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    cb(user); // 이때 callback 함수 실행
  }
  
  findUserCallBack(1, function (user) {
    console.log("user:", user);
  });
  //findUserAndCallBack(1, (user) => {
  //  console.log("user:", user);
  //});
```
- 결과 
```js
user: { id: 1, name: 'User1', email: '1@test.com' }
```

- 10번째 줄의 findUserCallBack(1, function (user) {.. 함수의 호출부를 보면 두번째 인자로 콜백 함수를 선언하여 넘겼습니다. 
- 따라서 7번째 줄의 findUserAndCallBack(id,cb) 함수가 실행될 때 cb 매개 변수는 콜백 함수는 할당 받으며, 
- cb(user); 가 실행될 때, 이 콜백 함수가 실행되게 됩니다.

- 위 두 코드의 차이점은 findUser() 함수는 결과값을 리턴하고 함수 외부에서 결과값을 이용하여 작업을 수행하는 반면에, 
- findUserCallBack() 함수는 결과값을 이용해서,
- 해야할 작업까지 함수 내부에서 수행해주기 때문에 결과값을 굳이 리턴할 필요가 없습니다.

- 자바스크립트에서는 함수도 숫자나 문자처럼 변수에 할당할 수 있는 하나의 값이기 때문에 콜백 함수를 다른 함수의 인자로 넘기는 것은 매우 자연스러운 현상입니다. 

- 그래서 위 두 코드는 단순히 스타일 차이로도 볼 수 있지만 자바스크립트 특유의 비동기 처리가 들어가게 되면 얘기가 약간 달라지게 됩니다

---------
## 비동기처리 with 콜백함수
- 비동기(Asynchronous) 함수란 호출부에서 실행 결과를 가다리지 않아도 되는 함수입니다. 
- 반대로 동기 함수(Synchronous) 함수는 호출부에서 실행 결과가 리턴될 때 까지 기다려야 하는 함수입니다.

- 비동기 함수의 이러한 Non-blocking 이점 때문에, 
- 자바스크립트처럼 싱글 쓰레드 환경에서 실행되는 언어에서 광범위하게 사용됩니다.  
- 비동기 함수를 사용하면 로직을 순차적으로 처리할 필요가 없기 때문에 동시 처리에서도 동기 함수 대비 유리.

- 하지만 비동기 함수는 동기 함수처럼 순차적 처리가 보장되지 않기 때문에 아래에 위치한 코드가 위에 위치한 코드보다 먼저 실행될 수 있다.
-----

- 자바 스크립트에는 setTimeout() 이라는 대표적인 내장 비동기 함수가 있습니다. 
- setTimeout()은 두 개의 매개 변수를 받는데, 
- 첫번째는 실행할 작업 내용을 담은 콜백 함수이고, 
- 두번째는 이 콜백 함수를 수행하기 전에 기다리는 밀리초 단위 시간입니다. 
- 즉, setTimeout() 함수는 두번째 인자로 들어온 시간 만큼 기다린 후에 첫번째 인자로 들어온 콜백 함수를 실행해줍니다.

```js callback-3
function findUserAndCallBack(id) {
	let user 
	setTimeout(function () {
		console.log("wait 1 sec")
		user = {
			id: id,
			name: "User" + id,
			email: id + "@gamil.com",
		};
	}, 1000)
	return (user);
}

const user = findUserAndCallBack(1);
// findUserAndCallBack(1, (user) => {
// 	console.log(user)
// });
console.log(user)
```
- 결과 
```
undefined
wait 1 sec
```
- 이유 
  - 예상치 못한 순서로 코드가 실행 되었다.
  - 3번째 줄의 setTimeout()은 비동기 함수이기 때문에 이 함수가 완료 될때 까지 기다리지않고 다음 라인인 11번째 return 부분으로 넘어간다.
  - 따라서 user가 정의 되지 않고 undefined 가 리턴 되고 그대로 
  - const user = findUserAndCallBack(1) 에서 undefined가 리턴 되고 user에 할당 된다.

- 해결 방법 (callback 함수)
  - 이와같이 실행 순서가 뒤죽박죽 이 될 때는 callback함수로 해결할수 있다.
  - 함수로 부터 결과 값을 리턴 받지 않고 
  - **결과 값을 이용해서 처리할 로직을 콜백 함수에 담아 인자로 던지면 된다.**

#1
```js #callback-4
function findUserAndCallBack(id, cb) {
	let user 
	setTimeout(function () {
		console.log("wait 1 sec")
	}, 1000)
	user = {
		id: id,
		name: "User" + id,
		email: id + "@gamil.com",
	};
	cb(user);
}

// const user = findUser(1);
findUserAndCallBack(1, (user) => {
	console.log(user)
});
// console.log(user)
```

#2
```js #callback-5
function findUserAndCallBack(id, cb) {
	let user;
	setTimeout(function () {
		console.log("wait 1 sec")
		user = {
			id: id,
			name: "User" + id,
			email: id + "@gamil.com",
		};
		cb(user);
	}, 1000)
}

// const user = findUserAndCallBack(1);
// console.log(user)a
findUserAndCallBack(1, (user) => {
	console.log(user)
});
```
#2 의 결과는 
```js
wait 1 sec
{ id: 1, name: 'User1', email: '1@gamil.com' }
```
#1 의 결과는 
```js
{ id: 1, name: 'User1', email: '1@gamil.com' }
wait 1 sec
```

- 왜 다른가? 
  - setTimeout()함수 안에 callback함수(cb)가 있냐 그 함수 뒤에 있냐의 차이

- #2
  - findUserAndCallBack() 함수의 두번째 인자로 결과값을 이용해서 실행될 로직을 넘겼고, setTimeout()은 1초 후에 이 콜백함수를 호출 하였다.
  - 이와같이 비동기 함수를 호출할때는 결과값을 리턴 받으려고 하지말고
  - 결과 값을 통해 처리할 로직을 콜백 함수로 넘기는 스타일로 코딩을 해줘야 예상된 결과를 얻을수 있다.
  
 - But !! 
 - 최근에는 비동기 처리를 콜백함수를 인자로 넘겨서 하는 스타일을 피하는 추세이다.
 - 왜냐면 콜백함수를 중첩해서 사용하게 되면 계속 들여쓰기 + 콜백지옥 
 - 따라서 요즘엔 `Promise` 나 `async/await` 를 이용 한다. 