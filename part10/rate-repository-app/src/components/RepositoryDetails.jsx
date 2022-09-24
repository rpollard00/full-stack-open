import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { FlatList, View } from 'react-native'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import { styles } from '../style'
import RepositoryItem from './RepositoryItem'
import Text from './Text'

const RepositoryInfo = ({ repository }) => {
  console.log(repository)
  return <RepositoryItem item={repository} detailView={true} />
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Left Column */}
        <View style={{ ...styles.innerColumn, ...styles.innerColumnLeft }}>
          <View style={styles.reviewScoreView}>
            <Text style={styles.reviewScoreText}>{review.rating}</Text>
          </View>
        </View>
        {/* Right Column  */}
        <View style={{ ...styles.innerColumn, ...styles.innerColumnRight }}>
          <Text fontSize="subheading" fontWeight="bold">
            {review.user.username}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'MM.dd.yyyy')}
          </Text>

          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

const RepositoryDetails = () => {
  const { id } = useParams()
  const repositoryResult = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  })

  if (repositoryResult.loading) return

  const repository = repositoryResult.data.repository

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  )
}

export default RepositoryDetails
