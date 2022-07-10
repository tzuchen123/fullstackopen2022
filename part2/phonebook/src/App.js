import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const addName = (event) => {
    const person = persons.find(person => person.name === newName)
    if (person) {
      alert(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      const changedPerson = { ...person, number:newNumber,}
  
    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        console.log('successed');
      }).catch(error => {
        setMessage(`Information of  ${person.name} has already been removed from serve`)
        setStatus(false)
      })

      return
    }
    
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    personService
    .create(personObject)
    .then(returnedPerson => {
      setMessage(`Added ${returnedPerson.name}`)
      setStatus(true)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchWord = (event) => {
    setSearchWord(event.target.value)
  }

  const personsToShow = (searchWord === '')
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(searchWord.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />

      <Filter searchWord={searchWord} handleSearchWord={handleSearchWord} />
      
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow}
        setPersons={setPersons} 
      />
    </div>
  )
}

export default App