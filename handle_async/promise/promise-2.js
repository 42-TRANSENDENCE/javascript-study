function divide(numA, numB) {
    return new Promise((resolve,reject) => {
        if (numB === 0)
            reject(new Error("0으로 나눌수 없다."))
        else resolve(numA/numB)
    })
}

divide(8,0)
.then(function (result) {
    console.log("성공",result)
})
.catch((error) => console.log("실패", error))