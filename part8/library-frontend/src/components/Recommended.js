import { useQuery } from "@apollo/client"
import { ALL_BOOKS_BY_GENRE } from "../queries"

// Filter with gql....
// use useQuery with variables where the genre filter for allBooks
// is set to favoriteGenre

const Books = ({ show, user }) => {
  const genre = user.favoriteGenre
  const { loading, error, data } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: genre }
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
