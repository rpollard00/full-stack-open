import { useMutation, useQuery } from '@apollo/client'
import { FlatList, View } from 'react-native'
import { DELETE_REVIEW } from '../graphql/mutations'
import { ME } from '../graphql/queries'
import { styles } from '../style'
import { ReviewItem } from './ReviewItem'
import Text from './Text'

export const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  })
  const [mutate, { error }] = useMutation(DELETE_REVIEW)

  const deleteReview = async (id) => {
    try {
      const result = await mutate({
        variables: {
          deleteReviewId: id,
        },
      })

      console.log('Results', result)
      refetch()
    } catch (e) {
      console.log('ERROR ', e)
    }
  }

  console.log('ME is', { data })

  if (loading) return

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} deleteReview={deleteReview} />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  )
}
