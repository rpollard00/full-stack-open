const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const config = require('./utils/config.js')

const pubsub = new PubSub()

const JWT_SECRET = config.JWT_SECRET


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
    allAuthors: async () => {
      return await Author.find({})
    },
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      
      return book
    },
    addAuthor: async (root, args, context) => {
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
    },
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers