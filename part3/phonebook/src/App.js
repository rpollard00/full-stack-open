import './App.css';

import { useState, useEffect } from 'react';
import Form from './components/Form'
import Search from './components/Search'
import Contacts from './components/Contacts'
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';


const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('informational')

  const hook = () => {
    phonebookService
      .getAll()
      .then(contactList => setContacts(contactList))
  }

  useEffect(hook, []) //empty array in 2nd element tells it to only fetch once

  const addNewContact = (event) => {
    event.preventDefault()
    const existingContact = contacts.find((contact) => (contact.name.toLowerCase() === newContact.toLowerCase()))
  
    if (existingContact) {
      // update existing contact
      updateHandler(existingContact)
    } 
    else {
      const contactObject = {
        name: newContact,
        phone: newPhone,
      }
      phonebookService
        .postContact(contactObject)
        .then(createdContact => {
          showMessage(`Added new contact ${createdContact.name}`, 'informational')
          return setContacts(contacts.concat(createdContact)
        )})
        
    }
    
    setNewContact('')
    setNewPhone('')
  }

  const updateHandler = contactToUpdate => {
    if (window.confirm(`Update contact ${contactToUpdate.name}?`)) {
      const contactUpdateObj = { ...contactToUpdate, phone: newPhone}
      phonebookService
        .updateContact(contactUpdateObj.id, contactUpdateObj)
        .then(updatedContact =>  {
          showMessage(`Updated contact ${updatedContact.name}: Phone ${updatedContact.phone}`, 'informational')
          return setContacts(contacts.map(contact => contact.id !== updatedContact.id ? contact : updatedContact ))
        })
        .catch(error => {
          showMessage(`Error ${contactToUpdate.name} doesn't exist!`, 'error')
          setContacts(contacts.filter(contact => contact.id !== contactToUpdate.id))
      })
    }
  }
  const showMessage = (message, style) => {
    setNotificationMessage(message)
    setNotificationStyle(style)
    setTimeout(() => setNotificationMessage(null), 5000)

  }
  const deleteHandler = (id) => {
    const contactName = contacts.find(c => c.id === id).name
    if (window.confirm(`Do you want to delete ${contactName}`)) {
      phonebookService
        .deleteContact(id)
        .then((response) => {
          showMessage(`${contactName} deleted successfully.`, 'informational')
          return setContacts(contacts.filter(contact => contact.id !== id))
        })
        .catch(error => {
          showMessage(`Error ${contactName} doesn't exist!`, 'error')
          return setContacts(contacts.filter(contact => contact.id !== id))
        })
    }
  }

  const handleNameField = event => setNewContact(event.target.value)
  const handlePhoneField = event => setNewPhone(event.target.value)
  const handleSearchField = (event) => setSearchName(event.target.value)
  
  const contactsToShow = contacts
    .filter(contact => contact.name.toLowerCase()
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
        contactName={newContact}
        phoneNumber={newPhone}
        contactHandler={addNewContact}
      />
      <h1>Numbers</h1>
      <Contacts 
        contacts={contactsToShow} 
        handleDelete={deleteHandler}/>
    </div>
  );
}

export default App;
