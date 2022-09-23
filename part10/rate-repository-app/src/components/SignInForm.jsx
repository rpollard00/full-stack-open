import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
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

export const SignInForm = ({ onSubmit }) => {
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

export const SignInContainer = ({
  initialValues,
  onSubmit,
  validationSchema,
}) => {
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
}
