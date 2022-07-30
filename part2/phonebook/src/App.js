import './App.css';

import { useState, useEffect } from 'react';
import Form from './components/Form'
import Search from './components/Search'
import Contacts from './components/Contacts'
import phonebookService from './services/phonebookService';


const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    phonebookService
      .getAll()
      .then(contactList => setContacts(contactList))
  }

  useEffect(hook, []) //empty array in 2nd element tells it to only fetch once

  const addNewContact = (event) => {
    event.preventDefault()
    
    const alreadyExists = contacts
      .map(contact => contact.name.toLowerCase())
      .includes(newContact.toLowerCase());

    if (alreadyExists) {
      alert(`${newContact} is already added to phonebook`);
    } 
    else {
      const contactObject = {
        //id: contacts.length + 1,
        name: newContact,
        phone: newPhone,
      }
      phonebookService
        .postContact(contactObject)
        .then(createdContact => setContacts(contacts.concat(createdContact)))
    }
    setNewContact('')
    setNewPhone('')
  }

  const deleteHandler = (id) => {
    console.log('Does this work?', id);
    const contactName = contacts.find(c => c.id === id).name
    if (window.confirm(`Do you want to delete ${contactName}`)) {
      /// do delete action
      // post the delete, get the list again, setContact to the new list
      phonebookService
        .deleteContact(id)
        .then((response) => {
          console.log('delete', response)
          response.status !== 200 ? console.log('delete failed', response) : setContacts(contacts.filter(contact => contact.id !== id))
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
