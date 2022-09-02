const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const { default: mongoose } = require('mongoose')

const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const addAuthor = async (root, args) => {
  const author = new Author({ ...args })

  await author.save()
  return author
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let authorObj
      if (!args.author && !args.genre) {
        return Book.find({})
          .populate('author', { name: 1, born: 1, id: 1 })
      }

      const authorList = await Author.find({})
      
      if (args.author) {
        
        // get the authorObj that matches the author argument
        authorObj = authorList
        .find(a => a.name.toLowerCase() === args.author.toLowerCase())

        if (!authorObj) {
          return null
        }
        console.log("authorObj", authorObj)
      }

      if (args.genre) {

      }


      console.log(authorList.map(a => `${a.name} ${a.id}`))
      
      if (args.author && args.genre) {
        return Book
          .find({
            author: authorObj._id,
            genres: { "$in": [args.genre] },
          })
          .populate('author', { name: 1, born: 1, id: 1 })
      } else if (args.author) {
        // find books where the author id equals authorObj._id
        return Book
          .find({ author: authorObj._id })
          .populate('author', { name: 1, born: 1, id: 1 })
      } else if (args.genre) {
        return Book
          .find({ genres: { "$in": [args.genre] } })
          .populate('author', { name: 1, born: 1, id: 1 })
      }
      return []
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      // get the author id
      // find all the books that correspond to that author id
      // count the length
      const authors = await Author
        .find({})
      const author = authors
        .find(a => a.name.toLowerCase() === root.name.toLowerCase())
      const result = await Book.find({ author: author.id })
      return result.length
    },
    name: (root) => root.name,
    born: (root) => root.born
  },
  Mutation: {
    addBook: async (root, args) => { 
      const authors = await Author.find({})
      // author isn't already listed
      if (!authors
        .map(a => a.name.toLowerCase())
        .includes(args.author.toLowerCase())) {
          const author = new Author({ name: args.author })
          await author.save()
      }

      const [author] = await Author.find({ name: args.author })
      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return book
    },
    addAuthor,
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name})

      if (!author) return null // guard against no author found

      author.born = Number(args.born)

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})