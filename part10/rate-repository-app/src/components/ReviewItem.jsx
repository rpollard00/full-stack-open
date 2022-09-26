import { format } from 'date-fns'
import { Alert, Pressable, View } from 'react-native'
import { useNavigate } from 'react-router-native'

import { styles } from '../style'

import Text from './Text'

export const ReviewItem = ({ review, deleteReview }) => {
  const navigate = useNavigate()

  const deleteReviewConfirm = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteReview(id),
        },
      ]
    )
  }

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
          {review.user ? (
            <Text fontSize="subheading" fontWeight="bold">
              {review.user.username}
            </Text>
          ) : (
            <Text fontSize="subheading" fontWeight="bold">
              {review.repository.fullName}
            </Text>
          )}
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'MM.dd.yyyy')}
          </Text>

          <Text>{review.text}</Text>
        </View>
      </View>
      {!review.user ? (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => navigate(`/repository/${review.repository.id}`)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go to Repository</Text>
          </Pressable>
          <Pressable
            onPress={() => deleteReviewConfirm(review.id)}
            style={{
              ...styles.button,
              backgroundColor: '#d6394c',
              marginLeft: 10,
            }}
          >
            <Text style={styles.buttonText}>Delete Review</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}
