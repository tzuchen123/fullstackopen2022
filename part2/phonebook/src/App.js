import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewfilter] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

  const addName = (event) => {
    if (persons.filter(person => person.name === newName).length === 1) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)

    setNewNumber(event.target.value)
  }

  const handlefilterChange = (event) => {
    const searchs = persons.filter((person) => person.name.includes(event.target.value))
    if (event.target.value !== '') {
      
    }
    console.log(searchs)
    setNewfilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={newfilter} onChange={handlefilterChange} /></div>
      
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input  value={newName} onChange={handleNameChange} /></div>
        <div>number: <input  value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App