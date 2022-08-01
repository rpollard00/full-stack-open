import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

// getAll
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
// addPerson
// post to the base url
const postPerson = (PersonObj) => {
  const request = axios.post(baseUrl, PersonObj)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

// updatePerson
const updatePerson = (id, newPersonObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObj)
  return request.then(response => response.data)
}

const exports = { getAll, postPerson, deletePerson, updatePerson }



export default exports