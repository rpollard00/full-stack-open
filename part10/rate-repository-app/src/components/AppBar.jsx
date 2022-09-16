import Constants from 'expo-constants'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    //marginBottom: 6,
    paddingStart: 10,
    paddingBottom: 10,
    //marginHorizontal: 8,
    //borderRadius: 10,
  },
  tab: {
    display: 'flex',
    flexGrow: 1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
})

const AppBarTab = ({ textContent, onPressFunction, ...props }) => {
  return (
    <Pressable onPress={onPressFunction} {...props}>
      <Text color="textLight" fontWeight="bold" style={styles.text}>
        {textContent}
      </Text>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab
        style={styles.tab}
        textContent="Repositories"
        onPressFunction={() => {
          console.log('Pressed')
        }}
      />
      <AppBarTab
        style={styles.tab}
        textContent="Test"
        onPressFunction={() => {
          console.log('Pressed')
        }}
      />
    </View>
  )
}

export default AppBar
