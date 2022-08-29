import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, 
    { refetchQueries: [ {query: ALL_AUTHORS} ]}
  )

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: {name, born}})

    setName('')
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
        <div>
          name <input 
            value={name} 
            onChange={({ target }) => setName(target.value)}/>
        </div>
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
