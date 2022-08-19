import { createSlice } from "@reduxjs/toolkit"

const notificationStart = { 
  message: "This is the notification message",
  style: "hidden",
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationStart,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return { message: message, style: 'notify' }
    },
    removeNotification(state, action) {
      return { message: '', style: 'hidden' }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
