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