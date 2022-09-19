import Constants from 'expo-constants'
import { Formik, useField } from 'formik'
import { StyleSheet, View } from 'react-native'
import theme from '../theme'

import Text from './Text'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    paddingLeft: 12,
    color: theme.colors.errorColor,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.elementBackground,
  },
  inputField: {
    borderWidth: 2,
    borderColor: 'black',
    margin: theme.margins.elementMargin,
    paddingLeft: 12,
    height: 50,
    borderRadius: theme.borders.elementRadius,
    fontSize: theme.fontSizes.inputField,
    justifyContent: 'center',
  },
  inputFieldError: {
    borderWidth: 2,
    borderColor: theme.colors.errorColor,
    margin: theme.margins.elementMargin,
    paddingLeft: 12,
    height: 50,
    borderRadius: theme.borders.elementRadius,
    fontSize: theme.fontSizes.inputField,
    justifyContent: 'center',
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <View style={styles.container}>
      <TextInput
        style={
          !showError
            ? styles.inputField
            : { ...styles.inputField, borderColor: theme.colors.errorColor }
        }
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  )
}

export default FormikTextInput
