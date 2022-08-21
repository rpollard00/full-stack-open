/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useDispatch, useSelector } from 'react-redux'
import { sortAnecdotes, voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  //const anecdotes = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => b.votes - a.votes))
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filterText = useSelector(state => state.filter)

  const handleClick = (anecdote) => {
    dispatch(voteFor(anecdote))
      .then(() => dispatch(sortAnecdotes()))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes
        .filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick = {() => {handleClick(anecdote)}}
          />
        )}
    </div>
  )
}

export default Anecdotes