const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlExpress = require('graphql-server-express').graphqlExpress
const graphiqlExpress = require('graphql-server-express').graphiqlExpress

const schema = require('./schema').schema
const PORT = process.env.PORT || 8010

const app = express().use('*', cors())

// app.use(express.static(path.join(__dirname, 'public')))

// graphiql explorer
app.use('/browser', graphiqlExpress({ endpointURL: '/graphql' }))

// graphql endpoint
app.use('/', bodyParser.json(), graphqlExpress({ schema }))
	
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
