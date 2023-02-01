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