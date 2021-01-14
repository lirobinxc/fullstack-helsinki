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
  delete: (url, catchFn) => {
    axios.delete(url)
      .then(res => res.data)
      .catch(err => {
        console.log('📣 ERROR ~')
        catchFn();
      })
  }
}

export default serverRequests;