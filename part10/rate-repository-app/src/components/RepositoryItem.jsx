import * as Linking from 'expo-linking'
import { useState } from 'react'
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigate } from 'react-router-native'
import { styles } from '../style'
import theme from '../theme'
import { formatLargeNumber } from '../utils/formatLargeNumber'
import Text, { Subheading, Tag } from './Text'

const RepositoryItemFields = ({ item, detailView, onPress }) => (
  <View testID="repositoryItem" style={styles.container}>
    <Pressable onPress={onPress}>
      <View style={styles.inner}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.heading}>
          <Subheading style={styles.name}>
            Full Name: {item.fullName}
          </Subheading>

          <Text style={styles.text}>Description: {item.description}</Text>
        </View>
      </View>
      <Tag textContent={item.language} />
      <View style={styles.stats}>
        <View>
          <Text style={styles.statsText} fontWeight="bold">
            {formatLargeNumber(item.stargazersCount)}
          </Text>
          <Text style={styles.statsText}>Stars</Text>
        </View>
        <View>
          <Text style={styles.statsText} fontWeight="bold">
            {formatLargeNumber(item.forksCount)}
          </Text>
          <Text style={styles.statsText}>Forks</Text>
        </View>
        <View>
          <Text style={styles.statsText} fontWeight="bold">
            {formatLargeNumber(item.reviewCount)}
          </Text>
          <Text style={styles.statsText}>Reviews</Text>
        </View>
        <View>
          <Text fontWeight="bold" style={styles.statsText}>
            {item.ratingAverage}
          </Text>
          <Text style={styles.statsText}>Ratings</Text>
        </View>
      </View>
      {detailView ? (
        <Pressable
          onPress={() => Linking.openURL(item.url)}
          style={styles.button}
          color={theme.colors.primary}
        >
          <Text style={styles.buttonText}>Open on GitHub</Text>
        </Pressable>
      ) : null}
    </Pressable>
  </View>
)

const RepositoryItem = ({ item, detailView }) => {
  const navigate = useNavigate()
  const onPress = () => {
    console.log(`${item.id} pressed`)
    navigate(`/repository/${item.id}`)
  }

  return (
    <RepositoryItemFields
      item={item}
      detailView={detailView}
      onPress={onPress}
    />
  )
}

export default RepositoryItem
