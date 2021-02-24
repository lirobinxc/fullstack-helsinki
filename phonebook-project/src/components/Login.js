import React, { useCallback, useState } from 'react'
import loginService from '../services/login'
import ErrorMessage from '../components/ErrorMessage' 

const Login = ({ username, handleUsername, password, handlePassword, handleLogin }) => {

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const user = await loginService.login({
  //       username, password
  //     })
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //   } catch(err) {
  //     console.log(err)
  //     displayErr('Wrong Credentials', true)
  //   }
  // }

  // const displayErr = (msg, trueOrFalse) => {
  //   setIsError(null)
  //   setErrorMessage('')
  //   setIsError(trueOrFalse)
  //   setErrorMessage(msg)
  //   setTimeout(() => {
  //     setIsError(null)
  //     setErrorMessage('')
  //   }, 4000)
  // }


  return (
    <>
      <h2>Login</h2>
        <form>
          <div>
            Username: <input type="text" value={username} name="Username" onChange={handleUsername}/>
          </div>
          <div>
            Password: <input type="text" value={password} name="Password" onChange={handlePassword}/>
          </div>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
    </>
  )
}

export default Login