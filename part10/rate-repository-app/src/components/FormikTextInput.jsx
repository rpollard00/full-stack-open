import { Formik, useField } from 'formik'
import { StyleSheet, View } from 'react-native'

import Text from './Text'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <View>
      <TextInput
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
