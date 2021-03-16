import React from 'react'

const LoginForm = ({ username, password, handleUsername, handlePassword, handleLoginSubmit }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        Username: <input type="text" name="username" onChange={handleUsername} value={username} /> <br/>
        Password: <input type="password" name="password" onChange={handlePassword} value={password} /> <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default LoginForm