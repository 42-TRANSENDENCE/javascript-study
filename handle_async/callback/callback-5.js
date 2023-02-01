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