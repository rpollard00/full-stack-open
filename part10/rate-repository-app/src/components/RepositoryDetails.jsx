import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
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
  const variables = { repositoryId: id, reviewsFirst: 10 }

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables },
  })

  useEffect(() => {
    console.log('use effect hook')
  }, [data])

  const handleFetchMore = async () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        reviewsAfter: data.repository.reviews.pageInfo.endCursor,
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  const onEndReach = () => {
    handleFetchMore()
    console.log('data updated??', data)
    console.log('Reached the end of reviews')
  }

  if (loading) return

  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default RepositoryDetails
