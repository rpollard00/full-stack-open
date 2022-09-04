import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_GENRE, BOOK_ADDED, ME } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books  = useQuery(ALL_BOOKS)
  const me = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      console.log("Book added", addedBook)
      updateCache(client.cache, { query: ALL_BOOKS_BY_GENRE, variables: { genre: "all" } }, addedBook)

    }
  })

  if  (authors.loading) {
    return <div>loading...</div>
  }

  if (me.loading) {
    return <div>loading...</div>
  }

  if (books.loading) return <div>loading ...</div>

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  if (!token) {
    return (
      <>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { 
          page !== 'login' 
          ? <button onClick={() => setPage('login')}>login</button> 
          : null 
        }
      </div>
        <Notify errorMessage={errorMessage}></Notify>
        <Authors 
          authors={authors.data.allAuthors} 
          show={page === 'authors'} 
          setError={notify} />
        <LoginForm 
          setToken={setToken} 
          setPage={setPage} 
          setError={notify} 
          show={page === 'login'} />
        <Books books={books.data.allBooks} show={page === 'books'} clientCache={client.cache}/>
      </>
    )
  }

  return (
    <div>
      <div>
        <p>Hello {me.data.me.username}</p>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommend</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage}></Notify>
      <Authors 
        authors={authors.data.allAuthors} 
        show={page === 'authors'} 
        setError={notify} 
      />
      <Books books={books.data.allBooks} show={page === 'books'}  user={me} />
      <Recommended 
        books={books.data.allBooks} 
        show={page === 'recommended'} 
        user={me.data.me} 
      />
      <NewBook show={page === 'add'} setError={notify} user={me.data.me}/>
    </div>
  )
}

export const updateCache = (cache, query, addedBook) => {
  return cache.updateQuery(query, ({ allBooks }) => {
    console.log("cache", cache)
    console.log("query", query)
    console.log("allBooks", allBooks)
    console.log("addedBook", addedBook)
    const updatedAllBooks = allBooks.concat(addedBook)
    console.log("allBooksConcat", updatedAllBooks)
    return {
      allBooks: updatedAllBooks
    }
  })
}

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App
