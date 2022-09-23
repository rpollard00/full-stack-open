import { FlatList } from 'react-native'
import { RepositoryItem } from './RepositoryItem'

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <>
      <FlatList
        data={repositoryNodes}
        //ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        // other props
      />
    </>
  )
}
