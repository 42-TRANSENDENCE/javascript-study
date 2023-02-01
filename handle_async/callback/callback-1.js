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