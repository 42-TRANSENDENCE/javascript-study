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