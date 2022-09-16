import Constants from 'expo-constants'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import theme from '../theme'

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
  text: {
    flex: 1,
    width: '100%',
    //paddingLeft: 10,
    flexWrap: 'wrap',
  },
  heading: {
    display: 'flex',
    paddingLeft: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
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
})

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
]

const formatLargeNumber = (num) => {
  // eslint-disable-next-line no-undef
  const formatNum = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)

  return formatNum
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.heading}>
          <Subheading>Full Name: {item.fullName}</Subheading>
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
    </View>
  )

  return (
    <>
      <FlatList
        data={repositories}
        //ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        // other props
      />
    </>
  )
}

export default RepositoryList
