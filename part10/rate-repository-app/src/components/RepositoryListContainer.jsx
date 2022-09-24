import { FlatList } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <>
      <FlatList
        data={repositoryNodes}
        //ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => <RepositoryItem {...props} />}
        // other props
      />
    </>
  )
}
