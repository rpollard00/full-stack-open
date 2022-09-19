import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import Main from './src/Main'
import createApolloClient from './src/utils/apolloClient'

const apolloClient = createApolloClient()

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="inverted" />
    </>
  )
}

export default App
