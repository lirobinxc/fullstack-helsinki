import { useState } from 'react';
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = {
      name: newName,
      phone: newPhone
    }

    const namesArr = persons.map((ele, i) => {
      return ele.name
    })
    const phoneArr = persons.map((ele, i) => {
      return ele.phone
    })


    if (namesArr.includes(newName)) {
      alert(`"${newName}" already exists.`);
      return;
    }
    if (phoneArr.includes(newPhone)) {
      alert(`"${newPhone}" already exists.`);
      return;
    }

    setPersons(persons.concat(newObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App