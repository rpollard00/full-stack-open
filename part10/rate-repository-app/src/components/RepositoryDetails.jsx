import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'

const RepositoryDetails = () => {
  const { id } = useParams()
  const repository = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  })

  if (repository.loading) return

  console.log(repository)
  return <RepositoryItem item={repository.data.repository} showUrl={true} />
}

export default RepositoryDetails
