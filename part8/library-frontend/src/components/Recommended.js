import { useQuery } from "@apollo/client"

// Filter with gql....
// use useQuery with variables where the genre filter for allBooks
// is set to favoriteGenre

const Books = ({ show, books, user }) => {
  const genre = user.favoriteGenre

  if (!show) {
    return null
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
    </div>
  )
}

export default Books
