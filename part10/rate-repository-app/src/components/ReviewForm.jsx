import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

import { useNavigate } from 'react-router-native'
import * as Yup from 'yup'

import { CREATE_REVIEW } from '../graphql/mutations'

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
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'must be at least 0')
    .max(100, 'Maximum is 100'),
  text: Yup.string().required('Umm'),
})

export const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

export const SubmitReview = () => {
  const [mutate, { data, error, loading }] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    console.log('Values', values)

    const reviewInput = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.text ? values.text : undefined,
    }

    console.log('review input', reviewInput)
    try {
      const result = await mutate({
        variables: {
          review: {
            ...reviewInput,
          },
        },
      })
      console.log('Submit review', result)
      navigate(`/repository/${result.data.createReview.repositoryId}`)
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
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="text" placeholder="Review" />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text color="textLight" style={styles.buttonText}>
                Create a review
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  )
}
