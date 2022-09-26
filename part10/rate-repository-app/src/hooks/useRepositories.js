import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositoriesGraphQl = (variables) => {
  console.log('useRepo', variables)

  const [repositories, setRepositories] = useState()
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        ...variables,
      },
    }
  )

  const fetchRepositories = () => {
    setRepositories(data.repositories)
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  useEffect(() => {
    if (!loading) {
      fetchRepositories()
    }
  }, [data, loading])

  //console.log(repositories)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  }
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
