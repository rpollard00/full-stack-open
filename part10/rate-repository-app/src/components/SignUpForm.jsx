import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSignIn } from '../hooks/useSignIn'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

import { useNavigate } from 'react-router-native'
import * as Yup from 'yup'

import { CREATE_USER } from '../graphql/mutations'

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

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username must be at least one character')
    .max(30, 'Max username length is 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Must be at least 5 characters')
    .max(50, 'Max length is 50 characters'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password confirmation required'),
})

export const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

export const SignUp = () => {
  const [mutate, { data, error, loading }] = useMutation(CREATE_USER)
  const navigate = useNavigate()
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    console.log('Values', values)

    const userInput = {
      username: values.username,
      password: values.password,
      // confirmPassword: values.confirmPassword,
    }

    console.log('user input', userInput)
    try {
      const result = await mutate({
        variables: {
          user: {
            ...userInput,
          },
        },
      })
      console.log('Submit user', result)
      const { data } = await signIn(userInput)
      console.log('Token:', data.authenticate.accessToken)
      navigate('/')
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
        {({ handleSubmit, values }) => (
          <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />
            <FormikTextInput
              name="passwordConfirm"
              placeholder="Confirm Password"
            />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text color="textLight" style={styles.buttonText}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  )
}
