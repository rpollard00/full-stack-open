import axios from 'axios'
const baseUrl = "http://localhost:3001/contacts"

// getAll
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
// addContact
// post to the base url
const postContact = (contactObj) => {
  const request = axios.post(baseUrl, contactObj)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

// updateContact
const updateContact = (id, newContactObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newContactObj)
  return request.then(response => response.data)
}

const exports = { getAll, postContact, deleteContact, updateContact }



export default exports