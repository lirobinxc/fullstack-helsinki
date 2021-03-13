import axios from 'axios'

const URL = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const request = await axios.get(URL)
  return request.data
}

let token = null

const setToken = (newToken) => {
  token = newToken
}

const postBlog = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  }
  const req = await axios.post(URL, data, config)
  return req
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      'Authorization': `bearer ${token}`
    }
  }
  const req = await axios.delete(`${URL}/${id}`, config)
  return req
}

const blogService = {
  setToken,
  getAll,
  token,
  postBlog,
  deleteBlog,
}

export default blogService