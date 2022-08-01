import React from 'react'

const Persons = (props) => {
  return (
    <ul>
      {
        props.persons.map((person) => 
          <Person
              key={person.id}
              id={person.id}
              name={person.name}
              phone={person.phone} 
              handleDelete={() => props.handleDelete(person.id)}
          />)
      }
    </ul>
    )
}

const Person = ({name, phone, handleDelete, id}) => {
  return (
    <li>{name} : {phone}<button onClick={() => handleDelete(id)}>Delete</button></li>
  )
}

export default Persons