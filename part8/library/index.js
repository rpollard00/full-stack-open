const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

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

  type User {
    username: String!
    favoriteGenre: String,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const addAuthor = async (root, args, context) => {
  const currentUser = context.currentUser
  
  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }

  const author = new Author({ ...args })
  try {
    await author.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
  return author
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    },
    allBooks: async (root, args) => {
      let authorObj
      if (!args.author && (!args.genre || args.genre === 'all')) {
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
      }
      
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
    allAuthors: async () => Author.find({}),
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const authors = await Author.find({})
      // author isn't already listed
      if (!authors
        .map(a => a.name.toLowerCase())
        .includes(args.author.toLowerCase())) {
          const author = new Author({ name: args.author })
          try {
            await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }  
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret') {
        throw new UserInputError('Invalid username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
  
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

