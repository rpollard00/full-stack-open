import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import theme from '../theme'
import AuthStorage from '../utils/authStorage'

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
})

const Break = () => <Text style={{ height: 0, padding: 0, margin: 0 }}></Text>

const formatLargeNumber = (num) => {
  // eslint-disable-next-line no-undef
  const formatNum = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)

  return formatNum
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.heading}>
          {/* <ScrollView horizontal style={{ display: 'flex' }}> */}
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
    </View>
  )

  return (
    <>
      <FlatList
        data={repositoryNodes}
        //ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        // other props
      />
    </>
  )
}

export default RepositoryList
