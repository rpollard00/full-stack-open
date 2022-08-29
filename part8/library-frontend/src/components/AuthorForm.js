import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';
import Select from 'react-select';

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorForm = ({ setError, authors }) => {
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [name, setName] = useState(null)

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, 
    { refetchQueries: [ {query: ALL_AUTHORS} ]}
  )
  
  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: {name: name.value, born}})

    setName(null)
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  }, [result.data]) // eslint-disable-line

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={name}
          defaultValue={null}
          onChange={setName} 
          options={authors.map((a) => {
            return ({ value: a.name, label: a.name })
          })} />
        <div>
          born <input 
            type="number"
            value={born} 
            onChange={({ target }) => setBorn(Number(target.value))}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
