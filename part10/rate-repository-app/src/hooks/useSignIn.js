import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { AUTHENTICATE } from '../graphql/mutations'

export const useSignIn = () => {
  const [mutate, { data, error, loading }] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const result = mutate({
      variables: {
        credentials: {
          username: username,
          password: password,
        },
      },
    })

    return result
  }

  return [signIn, { data, error, loading }]
}
