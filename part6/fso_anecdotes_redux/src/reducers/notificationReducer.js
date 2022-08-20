import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationStart = {
  message: 'This is the notification message',
  style: 'hidden',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationStart,
  reducers: {
    updateNotification(state, action) {
      const message = action.payload
      return { message: message, style: 'notify' }
    },
    removeNotification(state, action) {
      return { message: '', style: 'hidden' }
    }
  }
})

export const setNotification = (message, timeoutSeconds) => {
  return async dispatch => {
    dispatch(updateNotification(`${message}`))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutSeconds * 1000)
  }
}



export const { updateNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
