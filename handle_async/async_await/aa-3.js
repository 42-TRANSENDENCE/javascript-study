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