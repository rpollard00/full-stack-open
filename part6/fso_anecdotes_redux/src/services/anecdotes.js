import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateObj = async (obj) => {
  const id = obj.id
  const updatedObj = { ...obj }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj)
  return response.data
}

const exports = { getAll, createNew, updateObj }

export default exports
