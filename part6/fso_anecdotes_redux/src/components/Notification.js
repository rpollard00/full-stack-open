import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const styles = {
    'notify': {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    },
    'hidden': {
      display: 'none',
    }
  }
  return (
    <div style={styles[notification.style]}>
      {notification.message}
    </div>
  )
}

export default Notification