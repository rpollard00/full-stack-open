import { Formik, useField } from 'formik'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.elementBackground,
    paddingTop: 10,
  },
  button: {
    height: 50,
    backgroundColor: theme.colors.primary,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.margins.elementMargin,
    borderRadius: theme.borders.elementRadius,
  },
  buttonText: {
    fontSize: theme.fontSizes.inputField,
    fontWeight: theme.fontWeights.bold,
  },
})

const initialValues = {
  username: '',
  //password: '',
}

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username')
  const [passwordField, passwordMeta, passwordHelpers] = useField('password')

  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text color="textLight" style={styles.buttonText}>
          Login
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  //const [heightField, heightMeta, heightHelpers] = useField(']');
  const onSubmit = (values) => {
    const username = values.username
    const password = values.password

    if (username && password) {
      console.log(`Username: ${username}, Password ${password}`)
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
