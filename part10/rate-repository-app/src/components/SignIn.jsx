import { Formik, useField } from 'formik'
import { Pressable, TextInput, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

const initialValues = {
  username: '',
  //password: '',
}

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username')

  return (
    <View>
      <TextInput
        placeholder="username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
      />
      {/* <Pressable onPress={handleSubmit}>
        <Text>Login</Text>
      </Pressable> */}
    </View>
  )
}

const SignIn = () => {
  //const [heightField, heightMeta, heightHelpers] = useField(']');
  const onSubmit = (values) => {
    const username = values.username
    //const password = values.password

    if (username) {
      console.log(`Username: ${username}, Password `)
    }
  }

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
  // <Text>The sign in view</Text>
}

export default SignIn
