좀더 개선된 방식의 비동기 처리 -> async/await

## 복습겸 예제 Promise 를 통한 비동기 코딩
예1)
- 원격 REST API 를 호출을 하여 게시물 작성자의 이름을 리턴하는 함수를 작성하고 그 함수를 호출해보자


#1
```js aa-1
function fetchAuthorName(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response)=> response.json())
    // .then((re)=>console.log(re))
    .then((post) => post.userId)
    // .then((re)=>console.log(re))
    .then((userId) => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response)=>response.json())
        // .then((re)=>console.log(re))
        .then((user)=>console.log(user.name))

    })
}

fetchAuthorName(1)
```

#2
```js aa-2
function fetchAuthorName(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response)=> response.json())
    // .then((re)=>console.log(re))
    .then((post) => post.userId)
    // .then((re)=>console.log(re))
    .then((userId) => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response)=>response.json())
        // .then((re)=>console.log(re))
        .then((user)=>user.name)

    })
}

fetchAuthorName(1)
.then((name)=>console.log(name))
```
- 브라우저 내장함수인 fetch() 를 호출해서 Promise 객체를 리턴 받은후,
- Method Chaining 기법을 통해 then() 메서드를 연쇄적으로 호출하고 있다.
- 마치 리눅스의 파이프(`|`) 처럼 바로 이전의 then()메서드의 출력값을 입력값으로 사용 하여 새로운 출력값을 만들고 바로 다음 then()메서드의 입력값으로 넘겨준다.

- fetchAuthorName()함수 자체도 결국 Promise객체를 리턴하기 때문에 
- 호출할때도 then() 메서드를 사용해서 게시물 작성자의 이름을 출력해야한다(?#1 방법 대로 하는건 뭐지?) .

## 비동기 Promise 해결법 문제점
- 디버깅
  - 어디 then()에서 에러났는지 확인 어려움
- 예외처리
  - 동기코드와 비동기가 섞여 있을때 우락 하는경우 생기기 쉽다.
- 들여쓰기

## async/await 키워드를 통한 비동기 코딩
- 비동기 코드를 마치 동기 코드처럼 보이게 작성할수있다( 순서대로 코드실행? )

위의 예시 코드 를 이 키워드를 적용해보자
```js aa-3
async function fetchAuthorName(postId) {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const post = await postResponse.json()
    // console.log(post)
    const userId = await post.userId
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const user  = await userResponse.json()
    // console.log(user)
    return user.name
}


fetchAuthorName(1)
.then((name)=>console.log(name))
```

- 비동기 함수가 리턴하는 Promise로 부터 결과값을 추출해줍니다.
- 즉, await 키워드를 사용 하면 일반 비동기 처리 처럼 바로 실행이 다음 라인으로 넘어가는 것이 아니라
- 결과값을 얻을 수있을 때까지 기다려줍니다.
- 따라서 일반적인 동기 코드 처리와 동일한 흐름으로( 함수 호출후 결과값을 변수에 할당하는식) 작성가능
- 주의할점은 async 키워드가 붙어있는 함수를 호출하면 명시적으로 Promise 객체를 생성하여 리턴하지 않아도 Promise 객체가 리턴된다.
- 그래서 호출부를 보면 then()메서드 써서 출력한다.


- 근데 만약 이 호출부가 또다른 async 키워드가 붙어있는 함수의 내부에 있으면
- 동일한 방식으로 await 키워드를 사용해서 
- Promise 가 제공할 값에 바로 접근 가능 
```js aa-4
fetchAuthorName(1)
.then((name)=>console.log(name))
// === // 
async function printSol(postId) {
    const name = await fetchAuthorName(postId)
    console.log(name)
}
printSol(1)
```

### 예외 처리
try/catch로 처리가능
```js aa-5
async function fetchAuthorName(postId) {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const post = await postResponse.json()
    // console.log(post)
    const userId = await post.userId
    try{
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const user  = await userResponse.json()
        // console.log(user)
        return user.name
    } catch(err) {
        console.log("Fail to fetch user: ", err)
        return "Unknown"
    }
}

```
