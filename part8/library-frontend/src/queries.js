import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
query AllBooksByGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
    addBook(title: $title, published: $published, genres: $genres, author: $author) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      favoriteGenre
      username
    }
  }
`