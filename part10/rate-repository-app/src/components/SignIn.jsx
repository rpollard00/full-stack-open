import { useNavigate } from 'react-router-native'
import * as Yup from 'yup'
import { useSignIn } from '../hooks/useSignIn'

export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export const initialValues = {
  username: '',
  password: '',
}

export const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const username = values.username
    const password = values.password

    try {
      const { data } = await signIn({ username, password })
      console.log('Token:', data.authenticate.accessToken)
      navigate('/')
      // const token = new AuthStorage('auth')
      // token.setAccessToken(data.authenticate.accessToken)
    } catch (e) {
      console.log('ERROR ', e)
    }
  }

  return (
    <SignInContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  )

  // <Text>The sign in view</Text>
}
