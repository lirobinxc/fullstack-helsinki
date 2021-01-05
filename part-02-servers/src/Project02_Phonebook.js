import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3002/persons')
      .then(res => {
        console.log('📣 res ~', res)
        setPersons(res.data)
      })
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumInput = (event) => {
    setNewNum(event.target.value)
  }
  const handleFilterInput = (event) => {
    setFilterName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = {
      id: persons.length + 1,
      name: newName,
      number: newNum
    }

    if (persons.length > 0) {
      const nameArr = persons.map((ele, i) => ele.name.toLowerCase())
      // const numArr = persons.map((ele, i) => ele.number.toLowerCase())

      if (nameArr.includes(newName.toLowerCase())) {
        alert(`"${newName}" already exists.`)
        return;
      }
    }

    setPersons(persons.concat(newObj))
    setNewName('')
    setNewNum('')
  }

  const filteredPersons = persons.length > 0 
    ? persons.filter((ele, i) => {
        return ele.name.toLowerCase().includes(filterName.toLowerCase()) === true;
      })
    : [];

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} required/>
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumInput} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        Filter Names: <input value={filterName} onChange={handleFilterInput} />
      </div>
      {filteredPersons.map((ele, i) => {
        return <li key={ele.id}><strong>{ele.name}</strong> - {ele.number}</li>
      })}
    </div>
  )
}

export default App