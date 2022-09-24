import { gql } from '@apollo/client'

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
  }
`

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query {
    repositories {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFields
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
