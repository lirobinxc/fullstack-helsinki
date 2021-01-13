import React, { useEffect, useState } from 'react'
import PhonebookListItem from './components/PhonebookListItem'
import capitalizeName from './modules/capitalizeNameInputs'
import serverRequests from './modules/serverRequests'

const App = () => {
  const [personsDB, setPersonsDB] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const URL = 'http://localhost:3002/persons'

  useEffect(() => {
    serverRequests.get(URL)
      .then(data => setPersonsDB(data))
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

    const newID = () => {
      const idArr = personsDB.map(ele => ele.id).sort((a, b) => b - a)
      return idArr[0] + 1
    }
    const newPerson = {
      id: newID(),
      name: capitalizeName(newName),
      number: newNum
    }
    // Replace with new number if name exists
    if (personsDB.length > 0) {
      const nameArr = personsDB.map((ele, i) => ele.name.toLowerCase())  // create array if all existing names

      if (nameArr.includes(newName.toLowerCase())) {  // check if submitted name already exists
        const confirmReplace = window.confirm(`${newName} already exists. Replace the number?`)
        if (confirmReplace) {
          const personIndex = personsDB.findIndex(ele => ele.name.toLowerCase() === newName.toLowerCase())
          setPersonsDB([...personsDB, personsDB[personIndex].number = newNum])
          console.log('📣 persons ~', personsDB)
          // serverRequests.update(`${URL}/${existingPerson.id}`, existingPerson);
        } else return;
      } else {
        serverRequests.create(URL, newPerson);
      }
    }
    // setPersonsDB(personsDB.concat(newPerson))
    setNewName('')
    setNewNum('')
  }

  const handleDelete = e => {
    const id = Number(e.target.value);
    const person = personsDB.find(ele => ele.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)

    if (confirm) {
      serverRequests.delete(`${URL}/${id}`);
      
      const newPersonsDB = personsDB.filter(ele => ele.id !== id);
      setPersonsDB(newPersonsDB)
    }
  }

  const filteredPersons = personsDB.length > 0
    ? personsDB.filter((ele, i) => {
        const includesName = ele.name.toLowerCase().includes(filterName.toLowerCase())
        return includesName === true;
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
      <ul>
        {filteredPersons.map((ele, i) => {
          return <PhonebookListItem key={ele.id} personObj={ele} deleteButton={handleDelete}/>
        })}
      </ul>
    </div>
  )
}

export default App