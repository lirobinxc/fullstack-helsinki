import axios from "axios";

const serverRequests = {
  get: (url) => {
    return axios.get(url)
      .then(res => res.data)
  },
  create: (url, obj) => {
    axios.post(url, obj)
      .then(res => res.data)
  },
  update: (url, obj) => {
    axios.put(url, obj)
      .then(res => res.data)
  },
  delete: (url) => {
    axios.delete(url)
      .then(console.log(`${url} DELETED`))
      .catch(err => {
        alert('Deletion failed, no such persons exists.')
      })
  }
}

export default serverRequests;