import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'
import { RepositoryListContainer } from './RepositoryListContainer'
import RepositoryListHeader from './RepositoryListHeader'

const RepositoryList = () => {
  const [repoSort, setRepoSort] = useState({
    sort: 'CREATED_AT',
    order: 'DESC',
    friendly: 'Latest repositories',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const { repositories } = useRepositories(repoSort)

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
      />
    </>
  )
}

export default RepositoryList
