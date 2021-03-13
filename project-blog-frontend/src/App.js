import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import Blog from './components/Blog'
import loginService from './services/loginService'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [changedBlogs, setChangedBlogs] = useState(false)
  // * States for Add Blog section *
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const localUserData = JSON.parse(window.localStorage.getItem('blogUser'))
    if (localUserData) {
      setUser(localUserData)
      blogService.setToken(localUserData.token)
    }
    }, [])

  useEffect(() => {
    blogService.getAll()
    .then(
      data => setBlogs(data)
      )
    }, [changedBlogs])

  const handleAddBlogSubmit = async (e) => {
    e.preventDefault()
    const blogData = {
      title,
      author,
      url
    }
    try {
      const newBlog = await blogService.postBlog(blogData)
      console.log(`📣 newBlog ~`, newBlog)
      setChangedBlogs(!changedBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(err) {
      setErrorMsg('Could not post the blog, something went wrong')
      setTimeout(() => {
        setErrorMsg('')
      }, 2500)
    }
  }
  
  const addBlogSection = () => (
    <div>
      {
        errorMsg === ''
          ? null
          : <ErrorMessage msg={errorMsg} />
      }
      <form onSubmit={handleAddBlogSubmit}>
        Title: <input type="text" name="blogTitle" value={title} onChange={e => setTitle(e.target.value)} /> <br/>
        Author: <input type="text" name="blogAuthor" value={author} onChange={e => setAuthor(e.target.value)} /> <br/>
        URL: <input type="text" name="blogUrl" value={url} onChange={e => setUrl(e.target.value)} /> <br/>
        <input type="submit" />
      </form>
    </div>
  )
    
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const newUser = await loginService.login(credentials)
      setUsername('')
      setPassword('')
      setUser(newUser)
      window.localStorage.setItem('blogUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      console.log(`📣 user ~`, newUser)
    } catch(err) {
      setErrorMsg('Wrong username or password.')
      setTimeout(() => {
        setErrorMsg('')
      }, 2500)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('blogUser')
  }

  const handleBlogDelete = async (e) => {
    const id = e.target.name
    try {
      await blogService.deleteBlog(id)
      setChangedBlogs(!changedBlogs)
    } catch(err) {
      setErrorMsg('Problem deleting the blog.')
      setTimeout(() => {
        setErrorMsg('')
      }, 2500)
    }
  }

  if (user === null) {
    return (
      <div>
        {
          errorMsg === ''
            ? null
            : <ErrorMessage msg={errorMsg} />
        }
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          Username: <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} /> <br/>
          Password: <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} /> <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }

  return (
    <div>
      
      <h1>Blogs</h1>
      <p>Logged in as {user.name} <input type="submit" onClick={handleLogout} value="Logout"/></p>
      <h2>Add Blog</h2>
      {
        addBlogSection()
      }
      <h2>List</h2>
      <ul>
        {
          blogs.map(ele => {
            return <Blog key={ele.id} blogObj={ele} handleDelete={handleBlogDelete}/>
          })
        }
      </ul>
    </div>
    
  )
}

export default App