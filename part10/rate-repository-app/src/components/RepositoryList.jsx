import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'
import { RepositoryListContainer } from './RepositoryListContainer'
import RepositoryListHeader from './RepositoryListHeader'

const RepositoryList = () => {
  const [repoSort, setRepoSort] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    friendly: 'Latest repositories',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const { repositories, fetchMore } = useRepositories({ ...repoSort, first: 5 })

  const onEndReach = () => {
    fetchMore()
  }

  useEffect(() => {
    setRepoSort(repoSort)
  }, [repoSort, searchQuery])

  return (
    <>
      <RepositoryListHeader
        text={repoSort.friendly}
        repoSort={repoSort}
        setRepoSort={setRepoSort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <RepositoryListContainer
        repositories={repositories}
        repoSort={repoSort}
        setRepoSort={setRepoSort}
        searchQuery={debouncedSearchQuery}
        onEndReach={onEndReach}
      />
    </>
  )
}

export default RepositoryList
