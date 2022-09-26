import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      rating
      createdAt
      text
      user {
        username
      }
      repositoryId
    }
  }
`

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt
    }
  }
`
