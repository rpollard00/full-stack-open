import React from 'react'

const Contacts = (props) => {
  return (
    <ul>
      {
        props.contacts.map((contact) => 
          <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              phone={contact.phone} 
              handleDelete={() => props.handleDelete(contact.id)}
          />)
      }
    </ul>
    )
}

const Contact = ({name, phone, handleDelete, id}) => {
  return (
    <li>{name} : {phone}<button onClick={() => handleDelete(id)}>Delete</button></li>
  )
}

export default Contacts