import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.filter)
  const handleChange = event => {
    dispatch(setFilter(event.target.value))
    console.log(`The thing changed ${event.target.value}`)

  }

  return (
    <div>
      Filter: <input onChange={handleChange} value={filterText}></input>
    </div>
  )
}

export default Filter