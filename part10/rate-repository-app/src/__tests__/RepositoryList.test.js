import { render, within } from '@testing-library/react-native'
import { RepositoryListContainer } from '../components/RepositoryListContainer'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('contains correctly rendered repositoryItems', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      )
      const repositoryItems = getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

      expect(
        within(firstRepositoryItem).queryByTestId('repositoryItem')
      ).toHaveTextContent(
        `Full Name: jaredpalmer/formikDescription: Build forms in React, without the tearsTypeScript21.9KStars1.6KForks3Reviews88Ratings`
      )

      expect(
        within(secondRepositoryItem).queryByTestId('repositoryItem')
      ).toHaveTextContent(
        'Full Name: async-library/react-asyncDescription: Flexible promise-based React data loaderJavaScript1.8KStars69Forks3Reviews72Ratings'
      )
    })
  })
})
