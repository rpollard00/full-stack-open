import { useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { apolloClient } from '../../App'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

export const useSignIn = () => {
  const authStorage = useAuthStorage()
  const [mutate, { data, error, loading }] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    try {
      const result = mutate({
        variables: {
          credentials: {
            username: username,
            password: password,
          },
        },
      })

      const token = (await result).data.authenticate.accessToken
      authStorage.setAccessToken(token) // store the token in authStorage
      apolloClient.resetStore() // clear ApolloClient cache after storing the token

      console.log('TOKEN FROM STORE', await authStorage.getAccessToken())
      return result
    } catch (e) {
      console.log(e)
    }
  }

  return [signIn, { data, error, loading }]
}
