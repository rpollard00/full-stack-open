import Constants from 'expo-constants'
import { StyleSheet, Text, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'
import AppBar from './components/AppBar'
import RepositoryList from './components/RepositoryList'
import SignIn from './components/SignIn'
import theme from './theme'

const styles = StyleSheet.create({
  outer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
})

const Main = () => {
  return (
    <View style={styles.outer}>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
