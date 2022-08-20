import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },
    sortAnecdotes(state, action) {
      return state.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { createAnecdote, appendAnecdote, setAnecdotes, vote, sortAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer