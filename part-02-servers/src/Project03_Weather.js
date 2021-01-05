import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Weather({ cityName }) {
  const [data, setData] = useState({
    current: {
      temperature: '...',

    },
  })

  useEffect(() => {
    const APIkey = process.env.REACT_APP_WEATHERSTACK_APIKEY
    axios.get(`http://api.weatherstack.com/current?access_key=${APIkey}&query=${cityName}`)
    .then(res => setData(res.data))
  }, [])

  return (
    <div>
      <h2>Current Weather in {cityName}</h2>
      <div>
        <img src={data.current.weather_icons} alt="icon" />
        <p><strong>Temperature:</strong> {data.current.temperature} °C</p>
        <p><strong>Wind Speed:</strong> {data.current.wind_speed} km/h</p>
        
      </div>
    </div>
  )
  
}