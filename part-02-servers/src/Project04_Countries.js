import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import CountryData from './components/CountryData';
import ErrorBoundary from './components/ErrorBoundary';
import Flag from './components/Flag';
import Weather from './components/Weather';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredCountries = countries.filter((ele, i) => {
    return ele.name.toLowerCase().includes(filter.toLowerCase());
  })

  const handleShowButton = (event) => setFilter(event.target.value)

  return(
    <div>
      <h1 style={{color:"blue"}}>Countries of the World</h1>
      <div>
        Filter Country Name: <input value={filter} onChange={handleFilterChange}/>
      </div>
      {filteredCountries.length > 10
        ? <p>Too many countries to list, please be more specific.</p>
        : filteredCountries.length === 1 
          ? <ErrorBoundary>
              <CountryData countriesArr={filteredCountries}/>
              <Flag countryObj={filteredCountries[0]}/>
              <Weather cityName={filteredCountries[0].capital} />
            </ErrorBoundary>
          : filteredCountries.length === 0 
            ? <p>No countries found.</p> 
            : <ErrorBoundary><CountryList countriesArr={filteredCountries} handleClick={handleShowButton}/></ErrorBoundary>
      }
      
    </div>
  )
}