/* eslint-disable react-redux/useSelector-prefer-selectors */
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ filterText, setFilter }) => {
  const handleChange = event => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Filter: <input onChange={handleChange} value={filterText}></input>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { filterText: state.filter, }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: value => {
      dispatch(setFilter(value))
    },
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter