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