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
import theme from '../theme'
import { formatLargeNumber } from '../utils/formatLargeNumber'
import Text, { Subheading, Tag } from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: theme.colors.elementBackground,
    margin: 5,
    borderRadius: 10,
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    flexWrap: 'wrap',
    flex: 1,
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
  },
  text: {
    flex: 1,
    width: '100%',
    //paddingLeft: 10,
    flexWrap: 'wrap',
  },
  heading: {
    display: 'flex',
    paddingLeft: 10,
    flexGrow: 0,
    flexShrink: 1,
    paddingBottom: 10,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statsText: {
    flexGrow: 0,
    padding: 4,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 0,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },
})

const RepositoryItemFields = ({ item, showUrl, onPress }) => (
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
      {showUrl ? (
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

const RepositoryItem = ({ item, showUrl }) => {
  const navigate = useNavigate()
  const onPress = () => {
    console.log(`${item.id} pressed`)
    navigate(`/repository/${item.id}`)
  }

  return (
    <RepositoryItemFields item={item} showUrl={showUrl} onPress={onPress} />
  )
}

export default RepositoryItem
