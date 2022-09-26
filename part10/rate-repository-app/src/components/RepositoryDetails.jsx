import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { useNavigate, useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import { styles } from '../style'
import RepositoryItem from './RepositoryItem'
import { ReviewItem } from './ReviewItem'
import Text from './Text'

const RepositoryInfo = ({ repository }) => {
  console.log(repository)
  return <RepositoryItem item={repository} detailView={true} />
}

const RepositoryDetails = () => {
  const { id } = useParams()
  const variables = { repositoryId: id, reviewsFirst: 10 }

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables },
  })

  useEffect(() => {}, [data])

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
