import React from 'react'

const Login = ({ username, handleUsername, password, handlePassword, handleLogin }) => {
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