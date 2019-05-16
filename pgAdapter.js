const pgPromise = require('pg-promise')

const pgp = pgPromise({})
const psql = pgp({
	connectionString: process.env.POSTGRES_URL,
	ssl: true
})

exports.psql = psql