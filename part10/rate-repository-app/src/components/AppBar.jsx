import { useQuery } from '@apollo/client'
import Constants from 'expo-constants'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { apolloClient } from '../../App'
import { ME } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
    //marginBottom: 6,
    paddingStart: 10,
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    //marginHorizontal: 8,
    //borderRadius: 10,
  },
  tab: {
    display: 'flex',
    flexGrow: 1,
    marginHorizontal: 6,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
})

const AppBarTab = ({ textContent, onPress, link, ...props }) => {
  return (
    <Pressable {...props}>
      <Link to={link} onPress={onPress}>
        <Text color="textLight" fontWeight="bold" style={styles.text}>
          {textContent}
        </Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  const me = useQuery(ME)
  const auth = useAuthStorage()
  const navigate = useNavigate()

  const signout = async () => {
    console.log('signed out', me)
    await auth.removeAccessToken()
    apolloClient.resetStore()
    console.log('signed out', me.data)
    navigate('/')
  }

  if (me.loading) return

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <AppBarTab
          link="/"
          style={styles.tab}
          textContent="Repositories"
          onPress={() => {
            console.log('Pressed Repo')
          }}
        />
        {!me.data.me ? (
          <AppBarTab
            style={styles.tab}
            link="/signin"
            textContent="Sign-In"
            onPress={() => {
              console.log('Pressed Sign-In')
            }}
          />
        ) : (
          <>
            <AppBarTab
              style={styles.tab}
              link="/createReview"
              textContent="Create a review"
              onPress={() => console.log('create review pressed')}
            />
            <AppBarTab
              style={styles.tab}
              link="/"
              textContent="Sign-Out"
              onPress={signout}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
