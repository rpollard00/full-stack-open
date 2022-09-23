import {
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native'
import { act } from 'react-test-renderer'
import * as Yup from 'yup'
import { SignInContainer } from '../components/SignInForm'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments upon button press', async () => {
      const onSubmit = jest.fn()

      const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      })

      const initialValues = {
        username: '',
        password: '',
      }

      const { getByPlaceholderText, getByText, debug } = render(
        <SignInContainer
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      )
      debug()
      act(() => {
        fireEvent.changeText(getByPlaceholderText('Username'), 'kalle')
      })
      act(() => {
        fireEvent.changeText(getByPlaceholderText('Password'), 'password')
      })
      act(() => {
        fireEvent.press(getByText('Login'))
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
