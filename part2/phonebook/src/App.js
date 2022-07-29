import './App.css';

import { useState } from 'react';
import Form from './components/Form'
import Search from './components/Search'


const Contacts = (props) => {
  
}

const App = (props) => {
  const [contacts, setContacts] = useState(props.contacts)
  const [newContact, setNewContact] = useState('Blirk')
  const [newPhone, setNewPhone] = useState('123-456-7890')
  const [searchName, setSearchName] = useState('')

  const addNewContact = (event) => {
    event.preventDefault()
    console.log(event.target)
    
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

  const handleNameField = (event) => {
    console.log('contact', event.target.value);
    setNewContact(event.target.value);
  }

  const handlePhoneField = (event) => {
    console.log('phone', event.target.value);
    setNewPhone(event.target.value);
  }

  const handleSearchField = (event) => {
    console.log('search', event.target.value);
    setSearchName(event.target.value);
  }
  
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
      <ul>
        {contacts.map((contact) => <li key={contact.id}>{contact.name} : {contact.phone}</li>)}
      </ul>
    </div>
  );
}

export default App;
