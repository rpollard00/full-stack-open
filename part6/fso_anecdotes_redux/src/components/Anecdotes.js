import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

let timer

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
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const filterText = useSelector(state => state.filter)
  
  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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