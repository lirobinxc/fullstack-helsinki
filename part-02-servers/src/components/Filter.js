import { useState } from 'react'

export default function Filter({ persons }) {
  const [ filterName, setFilterName ] = useState('')

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const filteredPersons = persons.filter((ele, i) => {
    return ele.name.toLowerCase().includes(filterName.toLowerCase()) === true
  })

  return (
    <div>
      <div>
        Filter: <input value={filterName} onChange={handleFilterChange}/>
      </div>
      <ul>
        {filteredPersons.map((ele, i) => {
          return <li key={ele.name}><strong>{ele.name}</strong> - {ele.phone}</li>
        })}
      </ul>
    </div>
  )
}

