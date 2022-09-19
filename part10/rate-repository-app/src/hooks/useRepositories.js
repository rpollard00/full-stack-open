import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositoriesGraphQl = () => {
  const [repositories, setRepositories] = useState()
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  const fetchRepositories = () => {
    setRepositories(data.repositories)
  }

  useEffect(() => {
    if (!loading) {
      fetchRepositories()
    }
  }, [data, loading])

  //console.log(repositories)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return { repositories, loading }
}

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)

    const response = await fetch('http://192.168.88.115:5000/api/repositories')
    const json = await response.json()

    setLoading(false)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}

export default useRepositoriesGraphQl
