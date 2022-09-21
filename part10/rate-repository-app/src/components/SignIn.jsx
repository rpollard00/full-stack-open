import { Formik, useField } from 'formik'
import { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import * as Yup from 'yup'
import { useSignIn } from '../hooks/useSignIn'
import theme from '../theme'
import AuthStorage from '../utils/authStorage'
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

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
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
  const [signIn] = useSignIn()
  //const [heightField, heightMeta, heightHelpers] = useField(']');

  const onSubmit = async (values) => {
    const username = values.username
    const password = values.password

    try {
      const { data } = await signIn({ username, password })
      console.log('Token:', data.authenticate.accessToken)
      const token = new AuthStorage('auth')
      token.setAccessToken(data.authenticate.accessToken)
    } catch (e) {
      console.log('ERROR ', e)
    }
  }

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
  // <Text>The sign in view</Text>
}

export default SignIn
