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

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
  }
`

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  query Repository(
    $repositoryId: ID!
    $reviewsFirst: Int
    $reviewsAfter: String
  ) {
    repository(id: $repositoryId) {
      ...RepositoryFields
      url
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
        edges {
          node {
            ...ReviewFields
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`

export const ME = gql`
  ${REVIEW_FIELDS}
  query getMe($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`
