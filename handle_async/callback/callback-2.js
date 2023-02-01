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