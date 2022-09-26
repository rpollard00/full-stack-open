import Constants from 'expo-constants'
import { StyleSheet, Text, View } from 'react-native'
import { Navigate, Route, Routes, useParams } from 'react-router-native'
import AppBar from './components/AppBar'
import { MyReviews } from './components/MyReviews'
import RepositoryDetails from './components/RepositoryDetails'
import RepositoryList from './components/RepositoryList'
import { SubmitReview } from './components/ReviewForm'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUpForm'
import { styles } from './style'
import theme from './theme'

const Main = () => {
  return (
    <View style={styles.outer}>
      <AppBar />
      <View style={styles.outerContainer}>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/myReviews" element={<MyReviews />} exact />
          <Route path="/createReview" element={<SubmitReview />} exact />
          <Route path="/repository/:id" element={<RepositoryDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
