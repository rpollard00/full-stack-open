import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { styles } from '../style'
import Text from './Text'

const RepositorySearchBar = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}

const RepositoryListHeader = ({
  repoSort,
  setRepoSort,
  searchQuery,
  setSearchQuery,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleSort = (itemValue) => {
    setRepoSort(itemValue)
    setIsVisible(false)
  }

  return (
    <View style={styles.subHeadingContainer}>
      <RepositorySearchBar
        searchQuery={setSearchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Pressable
        style={styles.headerBar}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text>{repoSort.friendly}</Text>
        <Text>▼</Text>
      </Pressable>

      {isVisible ? (
        <Picker
          selectedValue={repoSort}
          onValueChange={(itemValue, itemIndex) => handleSort(itemValue)}
        >
          <Picker.Item
            label="Latest repositories"
            value={{
              sort: 'CREATED_AT',
              order: 'DESC',
              friendly: 'Latest repositories',
            }}
          />
          <Picker.Item
            label="Highest rated repositories"
            value={{
              sort: 'RATING_AVERAGE',
              order: 'DESC',
              friendly: 'Highest rated',
            }}
          />
          <Picker.Item
            label="Lowest rated repositories"
            value={{
              sort: 'RATING_AVERAGE',
              order: 'ASC',
              friendly: 'Lowest rated',
            }}
          />
        </Picker>
      ) : null}
    </View>
  )
}

export default RepositoryListHeader
