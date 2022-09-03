import { useEffect, useState } from 'react'

const getGenres = (books) => {
  console.log(books)
  const genres = books
    .map((b) => b.genres.filter(g => g !== "")) // filter blanks
  console.log(genres)
  return [...new Set(genres.flat()), 'all']
}

const Books = ({ show, books }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all')

  useEffect(() => {
    setGenres(getGenres(books))
  },[books])

  const filterGenre = (event) => {
    console.log('Target', event.target.textContent)
    setGenre(event.target.textContent)
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(b => genre !== 'all' ? b.genres.includes(genre) : b )
            .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
        return <button onClick={filterGenre} key={genre}>{genre}</button>
      })}
    </div>
  )
}

export default Books
