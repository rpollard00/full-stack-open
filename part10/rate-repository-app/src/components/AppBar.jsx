import Constants from 'expo-constants'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
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

const AppBarTab = ({ textContent, onPressFunction, link, ...props }) => {
  return (
    <Pressable onPress={onPressFunction} {...props}>
      <Link to={link}>
        <Text color="textLight" fontWeight="bold" style={styles.text}>
          {textContent}
        </Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <AppBarTab
          link="/"
          style={styles.tab}
          textContent="Repositories"
          onPressFunction={() => {
            console.log('Pressed')
          }}
        />
        <AppBarTab
          style={styles.tab}
          link="/signin"
          textContent="Sign-In"
          onPressFunction={() => {
            console.log('Pressed')
          }}
        />
      </ScrollView>
    </View>
  )
}

export default AppBar
