import React, { useEffect, useState } from 'react'
import PhonebookListItem from './components/PhonebookListItem'
import capitalizeName from './modules/capitalizeNameInputs'
import serverRequests from './modules/serverRequests'
import './index.css'
import ErrorMessage from './components/ErrorMessage'
import loginService from './services/login'

const App = () => {
  const [personsDB, setPersonsDB] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const URL = 'https://phonebook-api-lirobinxc.herokuapp.com/api/persons'

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
    //   const idArr = personsDB.map(ele => ele.id).sort((a, b) => b - a)
    //   return idArr[0] + 1
    // }
    const newPerson = {
      name: capitalizeName(newName),
      number: String(newNum)
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
          // const newPersonsDB = personsDB.filter(ele => ele.id !== copiedPerson.id)
          //   .concat(copiedPerson)
          // // setPersonsDB(newPersonsDB)
          serverRequests.update(`${URL}/${copiedPerson.id}`, copiedPerson)
            .then(data => {
              setPersonsDB(personsDB.concat(newPerson))
              displayErr(`Successfully updated ${newName}`, false)
            })
            .catch(err => {
              console.log(`📣 ERR ~`, err)
              displayErr(`Error updating ${newName}: number (min 8 digits)`, true)
            })
        } else return;
      } else {
        serverRequests.create(URL, newPerson)
        .then(data => {
          const temp = JSON.parse(data)
          console.log(`📣 temp ~`, temp)
          setPersonsDB(personsDB.concat(newPerson))
          displayErr(`Successfully added ${newName}`, false)
        })
        .catch(err => {
          console.log(`📣 ERR ~`, err)
          displayErr(`Error adding ${newName}: name (min 3 char), number (min 8 digits)`, true)
        })
      }
    } else {
      serverRequests.create(URL, newPerson)
        .then(data => {
          const temp = JSON.parse(data)
          console.log(`📣 temp ~`, temp)
          setPersonsDB(personsDB.concat(newPerson))
          displayErr(`Successfully added ${newName}`, false)
        })
        .catch(err => {
          console.log(`📣 ERR ~`, err)
          displayErr(`Error adding ${newName}: name (min 3 char), number (min 8 digits)`, true)
        })
    }
    setNewName('')
    setNewNum('')
  }

  const handleDelete = e => {
    const id = e.target.value;
    console.log(`📣 id ~`, id)
    const person = personsDB.find(ele => ele.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)

    if (confirm) {
      try {
        serverRequests.delete(`${URL}/${id}`, () => displayErr(`Error deleting ${person.name}`, true))
        const newPersonsDB = personsDB.filter(ele => ele.id !== id);
        setPersonsDB(newPersonsDB)
        displayErr(`Successfully deleted ${person.name}`, false)
      } catch (err) {
          console.log(`📣 error ~`, err)
      }
      
    }
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      console.log(err)
      displayErr('Wrong Credentials', true)
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
      <h2>Login</h2>
      <form>
        <div>
          Username: <input type="text" value={username} name="Username" onChange={handleUsernameInput}/>
        </div>
        <div>
          Password: <input type="text" value={password} name="Password" onChange={handlePasswordInput}/>
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
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
          return <PhonebookListItem key={ele.id} personObj={ele} deleteButton={handleDelete}/>
        })}
      </ul>
    </div>
  )
}

export default App