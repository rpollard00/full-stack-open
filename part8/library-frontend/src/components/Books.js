import { useLazyQuery, useSubscription } from "@apollo/client"

import { useEffect, useState } from 'react'
import { ALL_BOOKS_BY_GENRE, BOOK_ADDED } from "../queries"

import { updateCache } from "../App"

// run the query when the genre Button is pressed
// on initial load query all

const getGenres = (books) => {
  const genres = books
    .map((b) => b.genres.filter(g => g !== "")) // filter blanks
  return [...new Set(genres.flat()), 'all']
}

const Books = ({ show, books, user, clientCache }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all')
  const [
    getBooks,
    { loading, data }
  ] = useLazyQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: genre }
  })

  useEffect(() => {
    setGenres(getGenres(books))
    getBooks() // initial load books
    
  },[books, genre, user, data]) // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log("BookAdded", addedBook)
      
      // only updates cache if the component is showing, otherwise it fails because its unloaded
      if (show) updateCache(clientCache, { query: ALL_BOOKS_BY_GENRE, variables: { genre: genre } }, addedBook )
    }
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (user) {
    if (user.loading) {
      return <div>loading..</div>
    }
  }


  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {
      data !== undefined ? 
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            { 
              
                data.allBooks
                  .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )) 
            }
          </tbody>
        </table>
      : null 
      }
      {genres.map((genre) => {
        return <button onClick={(event) => {
          setGenre(event.target.textContent)
          getBooks()
        }} key={genre}>{genre}</button>
      })}
    </div>
  )
}

export default Books
