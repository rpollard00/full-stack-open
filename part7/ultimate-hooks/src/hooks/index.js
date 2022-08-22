import axios from 'axios'
import { useEffect, useState } from 'react'


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll(baseUrl)
  },[baseUrl])
  // ...
  const getAll = async (baseUrl) => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    const resourceObj = response.data
    setResources([...resources, resourceObj])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}