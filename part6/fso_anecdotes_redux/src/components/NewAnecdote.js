import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = ({ setNotification, createAnecdote }) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    setNotification(`You entered the anecdote: '${content}'`, 5)
    createAnecdote(content)
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

const mapDispatchToProps = dispatch => {
  // setNotification
  // createAnecdote
  return {
    setNotification: (value, time) => {
      dispatch(setNotification(value, time))
    },
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
  }
}

const ConnectedNewAnecdote = connect(
  null,
  mapDispatchToProps
)(NewAnecdote)

export default ConnectedNewAnecdote