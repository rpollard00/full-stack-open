import './App.css';

import { useState } from 'react';
import Form from './components/Form'
import Search from './components/Search'
import Contacts from './components/Contacts'


const App = (props) => {
  const [contacts, setContacts] = useState(props.contacts)
  const [newContact, setNewContact] = useState('Blirk')
  const [newPhone, setNewPhone] = useState('123-456-7890')
  const [searchName, setSearchName] = useState('')

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
        id: contacts.length + 1,
        name: newContact,
        phone: newPhone,
      }

      setContacts(contacts.concat(contactObject));
    }

    setNewContact('')
    setNewPhone('')
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
      <Contacts contacts={contactsToShow} />
    </div>
  );
}

export default App;
