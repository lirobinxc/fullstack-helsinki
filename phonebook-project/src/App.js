import React, { useState } from 'react'
// import Notes from './components/Notes'
import Login from './components/Login'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Notes from './components/Notes'

const App = () => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isError, setIsError ] = useState(null)

  // Display Errors
  const displayErr = (msg, trueOrFalse) => {
    setIsError(null)
    setErrorMessage('')
    setIsError(trueOrFalse)
    setErrorMessage(msg)
    setTimeout(() => {
      setIsError(null)
      setErrorMessage('')
    }, 3000)
  }
  
  // Login Component
  async function handleLogin(e) {
    e.preventDefault()
    
    if (username === 'admin') {
      setUser({
        name: 'Admin'
      })
      return
    }

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      console.log(err)
      displayErr('Wrong Credentials', true)
    }
  }

  return (
    <>
      { user === null
        ? <Login
          username={username}
          handleUsername={e => setUsername(e.target.value)}
          password={password}
          handlePassword={e => setPassword(e.target.value)}
          handleLogin={e => handleLogin(e)}
          />
        : <div>
          <h1 style={{color:'blue'}}>Logged in as {user.name}</h1>
          <Notes />
        </div>
      }
      { errorMessage 
        ? <ErrorMessage msg={errorMessage} isError={isError ? true : false}/>
        : ''
      }
    </>
  )
}

export default App