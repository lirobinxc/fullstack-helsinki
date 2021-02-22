import axios from "axios";

const serverRequests = {
  get: (url) => {
    return axios.get(url)
      .then(res => res.data)
  },
  create: (url, obj) => {
    return axios.post(url, obj)
  },
  update: (url, obj) => {
    return axios.put(url, obj)
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