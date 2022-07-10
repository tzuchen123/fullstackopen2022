import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, setPersons}) => {
    const setDelete = (id,name) => {
        window.confirm(`Delete ${name} ?`)

        personService
        .setDelete(id)
        .then(returnedPerson => {
            setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
            alert(
                ` ${name}' was already deleted from server`
              )
              setPersons(persons.filter(person => person.id !== id))
            })
      }

    return (
    <ul>
        {persons.map(person =>
            <li 
                key={person.id}>
                {person.name} {person.number}
                <button onClick={() => setDelete(person.id,person.name)}>delete</button>
            </li>
        )}
    </ul>

    )
  }

  
export default Persons