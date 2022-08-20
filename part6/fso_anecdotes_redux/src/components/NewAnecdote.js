import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const handleNotification = (message) => {
    dispatch(setNotification(`You entered the anecdote: '${message}'`))
    window.clearTimeout()
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    handleNotification(content)
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewAnecdote