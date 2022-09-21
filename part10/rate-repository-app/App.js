import { ApolloProvider } from '@apollo/client'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import AuthStorageContext from './src/contexts/AuthStorageContext'
import Main from './src/Main'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'

const authStorage = new AuthStorage()
export const apolloClient = createApolloClient(authStorage)

const App = () => {
  console.log(Constants.manifest)
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="inverted" />
    </>
  )
}

export default App
