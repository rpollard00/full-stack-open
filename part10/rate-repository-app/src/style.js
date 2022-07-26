import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'
import theme from './theme'

export const styles = StyleSheet.create({
  outer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
    flex: 1,
  },
  outerContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  separator: {
    height: 10,
  },
  subHeadingContainer: {
    display: 'flex',
    padding: 20,
    backgroundColor: theme.colors.background,
    margin: 5,
    borderRadius: 0,
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
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'black',
  },

  innerColumn: {
    borderWidth: 0,
    flex: 1,
    borderColor: 'red',
  },
  innerColumnLeft: {
    flex: 0.15,
    marginRight: 10,
  },
  innerColumnRight: {},
  reviewScoreView: {
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
  reviewScoreText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.primary,
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
  headerBar: {
    display: 'flex',
    paddingLeft: 0,
    marginTop: 8,
    flexGrow: 0,
    flexShrink: 1,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0,
    margin: 0,
    borderColor: 'black',
    justifyContent: 'space-between',
  },
  button: {
    //width: '100%',
    backgroundColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 5,
    marginVertical: 10,
    marginLeft: 0,
    flex: 1,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
