import React from 'react'

const Contacts = (props) => {
  return (
    <ul>
      {
        props.contacts.map((contact) => 
          <Contact
              key={contact.id}
              name={contact.name}
              phone={contact.phone} 
          />)
      }
    </ul>
    )
}

const Contact = ({name, phone}) => {
  return (
    <li>{name} : {phone}</li>
  )
}

export default Contacts