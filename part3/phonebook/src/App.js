import './App.css';

import { useState, useEffect } from 'react';
import Form from './components/Form'
import Search from './components/Search'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('informational')

  const hook = () => {
    phonebookService
      .getAll()
      .then(personList => setPersons(personList))
  }

  useEffect(hook, []) //empty array in 2nd element tells it to only fetch once

  const addNewPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((person) => (person.name.toLowerCase() === newPerson.toLowerCase()))
  
    if (existingPerson) {
      // update existing Person
      updateHandler(existingPerson)
    } 
    else {
      const personObject = {
        name: newPerson,
        phone: newPhone,
      }
      phonebookService
        .postPerson(personObject)
        .then(createdPerson => {
          showMessage(`Added new Person ${createdPerson.name}`, 'informational')
          return setPersons(persons.concat(createdPerson)
        )})
        
    }
    
    setNewPerson('')
    setNewPhone('')
  }

  const updateHandler = personToUpdate => {
    if (window.confirm(`Update person ${personToUpdate.name}?`)) {
      const personUpdateObj = { ...personToUpdate, phone: newPhone}
      phonebookService
        .updatePerson(personUpdateObj.id, personUpdateObj)
        .then(updatedPerson =>  {
          showMessage(`Updated person ${updatedPerson.name}: Phone ${updatedPerson.phone}`, 'informational')
          return setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ))
        })
        .catch(error => {
          showMessage(`Error ${personToUpdate.name} doesn't exist!`, 'error')
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
      })
    }
  }
  const showMessage = (message, style) => {
    setNotificationMessage(message)
    setNotificationStyle(style)
    setTimeout(() => setNotificationMessage(null), 5000)

  }
  const deleteHandler = (id) => {
    const personName = persons.find(c => c.id === id).name
    if (window.confirm(`Do you want to delete ${personName}`)) {
      phonebookService
        .deletePerson(id)
        .then((response) => {
          showMessage(`${personName} deleted successfully.`, 'informational')
          return setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showMessage(`Error ${personName} doesn't exist!`, 'error')
          return setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameField = event => setNewPerson(event.target.value)
  const handlePhoneField = event => setNewPhone(event.target.value)
  const handleSearchField = (event) => setSearchName(event.target.value)
  
  const personsToShow = persons
    .filter(person => person.name.toLowerCase()
    .includes(searchName.toLowerCase())
    );
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} notificationStyle={notificationStyle}/>
      <Search searchFieldHandler={handleSearchField} searchName={searchName}/>
      <h1>add a new</h1>
      <Form 
        nameFieldHandler={handleNameField}
        phoneFieldHandler={handlePhoneField}
        personName={newPerson}
        phoneNumber={newPhone}
        personHandler={addNewPerson}
      />
      <h1>Numbers</h1>
      <Persons
        persons={personsToShow} 
        handleDelete={deleteHandler}/>
    </div>
  );
}

export default App;
