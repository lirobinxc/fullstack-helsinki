import axios from 'axios'

export default function App() {

  axios.get('http://localhost:3005/notes')
    .then(res => {
      const notes = res.data
      console.log('📣 notes ~', notes)
    })

  return "Welcome"

}