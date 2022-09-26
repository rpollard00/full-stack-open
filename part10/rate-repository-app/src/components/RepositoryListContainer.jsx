import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import RepositoryListHeader from './RepositoryListHeader'

export const RepositoryListContainer = ({
  repositories,
  searchQuery,
  onEndReach,
}) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  console.log(repositoryNodes)
  const filteredRepositoryNodes = repositoryNodes.filter((node) => {
    if (searchQuery !== '' && searchQuery !== undefined) {
      return node.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    }

    return true
  })

  console.log('query', searchQuery === '')
  return (
    <>
      <FlatList
        data={filteredRepositoryNodes}
        //ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => <RepositoryItem {...props} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        // other props
      />
    </>
  )
}
