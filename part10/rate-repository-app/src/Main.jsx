import Constants from 'expo-constants'
import { StyleSheet, Text, View } from 'react-native'
import AppBar from './components/AppBar'
import RepositoryList from './components/RepositoryList'
import theme from './theme'

const styles = StyleSheet.create({
  outer: {
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: 'rgba(255, 255, 255, 180)',
    backgroundColor: '#0d172e',
  },
  container: {
    backgroundColor: theme.colors.background,
    //marginTop: Constants.statusBarHeight,
  },
})

const Main = () => {
  return (
    <View style={styles.outer}>
      <AppBar />
      <View style={styles.container}>
        {/* <Text>Rate Repository Application</Text> */}

        <RepositoryList />
      </View>
    </View>
  )
}

export default Main
