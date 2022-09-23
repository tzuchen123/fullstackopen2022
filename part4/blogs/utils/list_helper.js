const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce(function (sum,blog) {
    return sum + blog.likes
  },0)
  return total
}

const favoriteBlog = (blogs) => {
  let blogIndex = 0
  let likes = 0
  
  blogs.forEach((blog,index) => {
    if ( blog.likes > likes) {
      blogIndex = index
      likes = blog.likes
    }
  });

  return blogs[blogIndex]
}

const mostBlogs = (blogs) => {

}

const mostLikes = (blogs) => {

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}