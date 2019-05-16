const psql = require('./pgAdapter').psql
const find = require('lodash').find
const filter = require('lodash').filter

const publishers = [
	{ id: 1, name: 'Penguin' },
	{ id: 2, name: "O'Riely" },
	{ id: 3, name: 'Mega' },
]

const books = [
	{ id: 1, publisherId: 1, title: 'Introduction to GraphQL', likes: 2 },
	{ id: 2, publisherId: 2, title: 'Welcome to Meteor', likes: 3 },
	{ id: 3, publisherId: 2, title: 'Advanced GraphQL', likes: 1 },
	{ id: 4, publisherId: 3, title: 'Launchpad is Cool', likes: 7 },
]

const roles = [
	{ id: 'admin', name: 'Admin' },
	{ id: 'editor', name: 'Editor' },
	{ id: 'contributor', name: 'Contributor' }
]

const memStore = {}

exports.resolvers = {
	Query: {
		foo: () => 'bar',
		getMessage: () => memStore.message,
		books: (_, { publisherId }) => {
			if (publisherId) {
				return filter(books, { publisherId })
			}
			else {
				return books
			}
		},
		publishers: () => publishers,
		roles: () => roles,
		users: (_, args, ctx) => {
			const usersQuery = `SELECT id, fullname, email, role AS roleid FROM users`
			return psql.manyOrNone(usersQuery)
		}
	},
	Mutation: {
		setMessage: (_, { message }) => {
			memStore.message = message
			return message
		},
		likeBook: (_, { bookId }) => {
			const book = find(books, { id: bookId })
			if (!book) {
				throw new Error(`Couldn't find book with id ${bookId}`)
			}
			book.likes += 1
			return book
		},
		createUser: (_, { newUserInfo }) => {
			// console.log(newUserInfo); return
			const insertUserQuery = `INSERT INTO users (fullname, email, role) 
				VALUES ($1, $2, $3) RETURNING *, role AS roleid`
			return psql.one(insertUserQuery, [newUserInfo.fullname, newUserInfo.email, newUserInfo.role])
		}
	},
	Publisher: {
		books: (publisher) => filter(books, { publisherId: publisher.id }),
	},
	Book: {
		publisher: (book) => find(publishers, { id: book.publisherId }),
	},
	User: {
		role: (user) => find(roles, { id: user.roleid })
	}
}