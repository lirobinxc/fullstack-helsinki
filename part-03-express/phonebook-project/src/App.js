import React, { useEffect, useState } from 'react'
import PhonebookListItem from './components/PhonebookListItem'
import capitalizeName from './modules/capitalizeNameInputs'
import serverRequests from './modules/serverRequests'
import './index.css'
import ErrorMessage from './components/ErrorMessage'

const mongoPW = process.env.REACT_APP_MONGOOSE_PW
export { mongoPW }

const App = () => {
  const [personsDB, setPersonsDB] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(null)

  const URL = 'http://localhost:3001/api/persons'
  console.log(`📣 ENV ~`, process.env.REACT_APP_MONGOOSE_PW)

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
  const displayErr = (msg, trueOrFalse) => {
    setIsError(null)
    setErrorMessage('')
    setIsError(trueOrFalse)
    setErrorMessage(msg)
    setTimeout(() => {
      setIsError(null)
      setErrorMessage('')
    }, 4000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // const newID = () => {
    //   const idArr = personsDB.map(ele => ele._id).sort((a, b) => b - a)
    //   return idArr[0] + 1
    // }
    const newPerson = {
      // _id: newID(),
      name: capitalizeName(newName),
      number: newNum
    }
    // Replace with new number if name exists
    if (personsDB.length > 0) {
      const nameArr = personsDB.map((ele, i) => ele.name.toLowerCase())  // create array if all existing names

      if (nameArr.includes(newName.toLowerCase())) {  // check if submitted name already exists
        const confirmReplace = window.confirm(`${newName} already exists. Replace the number?`)
        if (confirmReplace) {
          const personReference = personsDB.find(ele => ele.name.toLowerCase() === newName.toLowerCase())
          const copiedPerson = Object.assign({}, personReference);  // creates shallow-copy of the existing person object
          copiedPerson.number = newNum;
          const newPersonsDB = personsDB.filter(ele => ele._id !== copiedPerson._id)
            .concat(copiedPerson)
          setPersonsDB(newPersonsDB)
          serverRequests.update(`${URL}/${copiedPerson._id}`, copiedPerson);
          displayErr(`Successfully updated ${newName}`, false)
        } else return;
      } else {
        serverRequests.create(URL, newPerson);
        setPersonsDB(personsDB.concat(newPerson))
        displayErr(`Successfully added ${newName}`, false)
      }
    }
    setNewName('')
    setNewNum('')
  }

  const handleDelete = e => {
    const id = Number(e.target.value);
    const person = personsDB.find(ele => ele._id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)

    if (confirm) {
      serverRequests.delete(`${URL}/${id}`, () => displayErr(`Error deleting ${person.name}! Name does not exist.`, true))
      const newPersonsDB = personsDB.filter(ele => ele._id !== id);
      setPersonsDB(newPersonsDB)
      displayErr(`Successfully deleted ${person.name}`, false)
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
      {errorMessage ? <ErrorMessage msg={errorMessage} isError={isError ? true : false}/> : ''}
      <div>
        Filter Names: <input value={filterName} onChange={handleFilterInput} />
      </div>
      <ul>
        {filteredPersons.map((ele, i) => {
          return <PhonebookListItem key={ele._id} personObj={ele} deleteButton={handleDelete}/>
        })}
      </ul>
    </div>
  )
}

export default App