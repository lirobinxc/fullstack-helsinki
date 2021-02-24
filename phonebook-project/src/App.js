import React, { useState } from 'react'
// import Notes from './components/Notes'
import Login from './components/Login'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  // const [ personsDB, setPersonsDB] = useState([])
  // const [ newName, setNewName ] = useState('')
  // const [ newNum, setNewNum ] = useState('')
  // const [ filterName, setFilterName ] = useState('')

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
    }, 4000)
  }
  
  // Login Component
  async function handleLogin(e) {
    e.preventDefault()
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
      <Login
        username={username}
        handleUsername={e => setUsername(e.target.value)}
        password={password}
        handlePassword={e => setPassword(e.target.value)}
        handleLogin={e => handleLogin(e)}
      />
      { errorMessage 
        ? <ErrorMessage msg={errorMessage} isError={isError ? true : false}/>
        : ''
      }
    </>
  )
}

export default App