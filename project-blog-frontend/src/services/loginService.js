import axios from 'axios'

const URL = 'http://localhost:3001/api/login'

const login = async (credentials) => {
  const user = await axios.post(URL, credentials)
  return user.data
}

const loginService = {
  login,
}

export default loginService