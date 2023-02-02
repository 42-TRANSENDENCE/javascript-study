function repeat(n) {
    for (var i= 0; i<n; ++i ) {
        console.log(i)
    }
}

repeat(5)
console.log("----------------")
/**
 * 위의 경우 함수를 매번 새롭게 정의 해야한다.
 *  함수를 합성하면 함수의 변하지 않는 공통 로직은 미리 정의해 두고 변경되는 로직은 추상화 해서 함수 외부에서 함수 내부로 전달할수있다.
 */

// 외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat1(n,f) {
    for(var i =0; i< n; ++i) {
        f(i)
    }
}

var logAll = function (i) {
    console.log(i)
}

repeat1(5,logAll)
console.log("----------------")
var logOdds = function (i) {
    if (i %2 ) console.log(i)
}

repeat1(5, logOdds)
console.log("----------------")

/**
 * repeat1 함수는 경우에 따라 변경 되는 일을 함수 f로 추상화 했고 이를 외부에서 전달 받는다. repeat1이 고차함수 : 매개변수를 통해 함수의
 * 외부에서 콜백함수를 전달 받은 함수
 * 함수의 매개변수를 통해 다른 함수의 내부로 전달 되는 함수: 콜백 함수 
 * 
 * 고차 함수는 콜백 함수를 자신의 일 부분으로 함성한다.
 */