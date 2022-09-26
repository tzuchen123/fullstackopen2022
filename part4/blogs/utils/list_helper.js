const { maxBy } = require('lodash');
var _ = require('lodash');

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

  delete blogs[blogIndex]._id
  delete blogs[blogIndex].url
  delete blogs[blogIndex].__v

  return blogs[blogIndex]
}

const mostBlogs = (blogs) => {

  let counts = _(blogs)
  .groupBy(blog => blog.author)
  .map((obj, key) => ({
    'author': key,
    'blogs': obj.length }))
  .value();

  let result = _.maxBy(counts, 'blogs');

  return result
}

const mostLikes = (blogs) => {

  let counts = _(blogs)
  .groupBy(blog => blog.author)
  .map((objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes') }))
  .value();

  let result = _.maxBy(counts, 'likes');

  return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}