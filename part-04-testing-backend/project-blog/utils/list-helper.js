const totalLikes = blogsArr => {
  return blogsArr.length === 0
    ? 0
    : blogsArr.reduce((acc, val) => {
        return val.likes + acc
      }, 0)
}

const favBlog = blogsArr => {
  return blogsArr.length === 0
    ? { error: 'No blogs given' }
    : blogsArr.length === 1
      ? { title: blogsArr[0].title, author: blogsArr[0].author, likes: blogsArr[0].likes }
      : blogsArr.reduce((acc, val) => {
          return val.likes >= acc.likes
            ? { title: val.title, author: val.author, likes: val.likes }
            : { title: acc.title, author: acc.author, likes: acc.likes }
        })
}

const mostBlogs = blogsArr => {
  if (blogsArr.length === 0) return { error: 'No blogs given' }

  const authors = {}
  blogsArr.map(ele => {
    return authors[ele.author] === undefined
      ? authors[ele.author] = 1
      : authors[ele.author] += 1
  })

  const authorsArr = Object.entries(authors)
  
  // Iterate through authorsArr to find highest blog count
  const winningAuthor = authorsArr.reduce((acc, val) => {
    return val[1] > acc[1]
      ? val
      : acc
  })

  return { author: winningAuthor[0], blogs: winningAuthor[1]}
}

const mostLikedAuthor = blogsArr => {
  if (blogsArr.length === 0) return { error: 'No blogs given' }

  const authors = {}
  blogsArr.map(ele => {
    return authors[ele.author] === undefined
      ? authors[ele.author] = ele.likes
      : authors[ele.author] += ele.likes
  })

  const authorsArr = Object.entries(authors)

  // Iterate through authorsArr to find highest blog count
  const winningAuthor = authorsArr.reduce((acc, val) => {
    return val[1] > acc[1]
      ? val
      : acc
  })

  return { author: winningAuthor[0], likes: winningAuthor[1] }
}

// const blogsArr = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]
// mostLikedAuthor(blogsArr)

module.exports = {
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikedAuthor
}