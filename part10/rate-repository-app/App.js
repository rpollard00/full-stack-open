import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import Main from './src/Main'

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="inverted" />
    </>
  )
}

export default App
