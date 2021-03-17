import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import Blog from './components/Blog'
import loginService from './services/loginService'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [updateBlogs, setUpdateBlogs] = useState(false)
  // // * States for Add Blog section *
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

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
    }, [updateBlogs])
    
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

  function toggleUpdateBlogs() {
    setUpdateBlogs(!updateBlogs)
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs App</h1>
        {
          errorMsg === ''
            ? null
            : <ErrorMessage msg={errorMsg} />
        }
        <Toggleable buttonLabel="Login">
          <LoginForm 
            username={username}
            password={password}
            handleUsername={(e) => {setUsername(e.target.value)}}
            handlePassword={(e) => {setPassword(e.target.value)}}
            handleLoginSubmit={handleLoginSubmit}
          />
        </Toggleable>
      </div>
    )
  }

  return (
    <div>
      
      <h1>Blogs App</h1>
      <p>Logged in as {user.name} <input type="submit" onClick={handleLogout} value="Logout"/></p>
      <Toggleable buttonLabel="Add a new blog">
        <AddBlog toggleUpdateBlogs={toggleUpdateBlogs}/>
      </Toggleable>
      <h2>List</h2>
      {
        errorMsg === ''
        ? null
        : <ErrorMessage msg={errorMsg} />
      }
      <ul>
        {
          blogs.map(ele => {
            return <Blog key={ele.id} blogObj={ele} toggleUpdateBlogs={toggleUpdateBlogs}/>
          })
        }
      </ul>
    </div>
    
  )
}

export default App