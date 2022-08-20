import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      return state.map(a => a.id !== id ? a : anecdote)
    },
    sortAnecdotes(state, action) {
      return state.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.updateObj(changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, sortAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer