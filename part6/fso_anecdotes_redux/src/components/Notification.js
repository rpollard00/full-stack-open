/* eslint-disable react-redux/useSelector-prefer-selectors */
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
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
    <div style={styles[props.notification.style]}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification