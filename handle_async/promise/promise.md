- 콜백지옥이라고 불리는 문제를 해결하기 위한 여러방법중 하나인 `Promise`

## Promise의 개념
- 현재 당장 얻을수는 없지만 가까운 미래에는 얻을 수 있는 어떤 데이터에 접근 하기 위한 방법을 제공한다.
- 당장 원하는 데이터를 얻을 수 없다는 것은 delay,latency가 발생하는 경우이다.(I/O, Network 를 통해 데이터를 얻는 경우)
- CPU 에 의해서 실행된느 코드 입장에서는 엄청나게 긴 지연 시간으로 여겨지기 때문에 Non-blocking 코드를 지향하는 비동기 처리가 필수적.


```js promise-1
function findUserAndCallBack(id) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			console.log("wait 1 sec")
			const user = {
				id: id,
				name: "User" + id,
				email: id + "@gamil.com",
			};
			resolve(user);
		}, 1000)
	})
}

// const user = findUserAndCallBack(1);
// console.log(user)a
findUserAndCallBack(1).then((user) => {
	console.log(user)
});
```

- 전 포스트 에선 콜백 함수를 인자로 넘겼는데 
- 위의 코드에선 Promise 객체를 생성하여 리턴 하고 
- 호출부에서는 리턴받은 Promise 객체에 then() 메서드를 호출 하여 결과 값을 가지고 실행할 로직을 넘겨주고 있다.

## 문법
- Promise객체를 리턴하는 함수.
- Promise객체는 new키워드와 생성자를 통해서 생성할 수 있는데 이 생성자는 함수를 인자로 받는다.
- 그리고 이 함수 인자는 resolve, reject 란느 2개의 함수형 파라미터를 가진다.
  - resolve() 함수의 인자로는 미래 시점에 얻게될 결과를 넘겨주고
  - reject() 함수의 인자로는 미래 시점에 발생할 예외를 넘겨준다.
```
const promise = new Promise(function(resolve, reject) {...} );
```
===
```
const promise = new Promise((resolve,reject), ()=> {})
```

## 예제
```js promise-2
function divide(numA, numB) {
    return new Promise((resolve,reject) => {
        if (numB === 0)
            reject(new Error("0으로 나눌수 없다."))
        else resolve(numA/numB)
    })
}

divide(8,0) // 이거일땐 에러 발생 0으로 나누닌까.
.then(function (result) {
    console.log("성공",result)
})
.catch((error) => console.log("실패", error))
```

## then(), catch() 사용법 +
- 실제 코딩할때는 Promise를 직접 생성해서 리턴해주는 코드 보다는 어떤 라이브러리의 함수를 호출해서 리턴 받은 Promise 객체를 사용하는 경우가 더 많다.
- REST API를 호출할때 사용 되는 브라우저 내장 함수인 fetch() (NodeJs런 타임에서는 node-fetch 모듈을 설치해야 가능)
- fetch()함수는 API의 URL을 인자로 받고 
- 미래 시점에 얻게될 API 호출 결과를 Promise 객체로 리턴한다. 
- network latency 때문에 바로 결과 값을 얻을수 없는 상황이므로 

- Promise의 객체 then(), catch() 
  - then() 메소드는 결과값을 가지고 수행할 로직을 담은 콜백함수를 인자로 받는다.
  - catch() 메소드는 예외 처리 로직을 담은 콜백 함수를 인자로 받는다.


예 )
- fetch() 함수를 이용해서 API 호출후 정상 응답결과 출력해보기 )
```js promise-3
//fetch("")
fetch("https://velog.io/")
.then((response) => console.log("respone: ", response))
.catch((error) => console.log("error: ",error))
```

## Promise의 메서드 체이닝(method chaining)

- then(), catch() 메서드는 또다른 Promise 객체를 리턴한다.
- 그리고 이 Promise 객체는 인자로 넘긴 콜백함수의 리턴값을 다시 then(), catch()메서드를 통해 접근할수 있다.
- 즉, 사슬 처럼 계속 연결 하여 연쇄적으로 호출 할수 있다.

예)
- fetch() 메서드로 응답 결과가 아닌 응답 전문을 json 형태로 출력 하고 싶은 경우 then()메서드를 추가로 연결 해주면 된다.
```js 
fetch("https://www.typescripttutorial.net")
.then((response) => response.json())
.then((post)=>console.log("post",post))
.catch((error) => console.log("error: ",error))
```
> 에러 발생 !! 
```
error:  SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
    at JSON.parse (<anonymous>)
    at packageData (node:internal/deps/undici/undici:6403:23)
    at specConsumeBody (node:internal/deps/undici/undici:6381:14)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

왜 이런 에러가 .. ?

> - url response 가 https://www.typescripttutorial.net 이놈은 html 이닌까 당연히 안 되는게 당연 했다.
- https://jsonplaceholder.typicode.com/posts/1 얘의 response는 json 형태이다.

- fetch("https://jsonplaceholder.typicode.com/posts/1") 로 수정후
- 결과 값 
```js
post {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto'
}
```
- ex2

```js promise-4
fetch("https://jsonplaceholder.typicode.com/posts/1")
.then((response) => response.json())
.then((post)=>post.userId)
// .then((re)=>console.log(re))
.then((userId)=>"https://jsonplaceholder.typicode.com/posts/" + userId)
.then((url) =>fetch(url))
.then((response) => response.json())
.then((user) => console.log("user : ", user))
.catch((error) => console.log("error: ",error))
```
- 3번째 줄의 콜백 함수는 post 객체에서 userId필드만 추출 하여 리턴하고 있고 
- 4번째 줄의 콜백 함수는 이 userId 를 가지고 유저 상세 조회를 위한 API의 URL을 만들어서 리턴 하고 있고
- 5번째 줄의 콜백 함수는 , 이 url을 가지고 fetch() 함수를 호출 하여 새로은 Promise 객체를 리턴 하고 있다.

- 즉, then(), catch() 의 인자로 넘긴 콜백 함수는 일반 객체를 리턴하든 Promise 객체를 리턴 하든 크게 상관 없다.
- 왜냐면 일반 객체를 리턴할경우 then(),catch() 메소드는 항상 그 객체를 얻을수있는 Promise 객체를 리턴하도록 되어있기 때문.

## BUT! !! 

- async/await 키워드가 더 대세 ! 
다음 엔 이거 포스팅.
