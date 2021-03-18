import React from 'react'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
}

export default LoginForm