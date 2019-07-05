const express = require('express')
const {
  ApolloServer
} = require('apollo-server-express')
const jwt = require('express-jwt')
const schema = require('./data/schema')
const {
  User
} = require('./models')
const cors = require('cors')

require('dotenv').config()

const PORT = 3000
const app = express()

app.use(cors())
/*
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256']
})

app.use(jwtCheck)*/

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
})

app.use(auth)

const server = new ApolloServer({
  schema,
  context: async ({
    req,
    res
  }) => {
    let user;
    if (req.user)
      user = req.user
    else
      user = null

    return {
      user,
    }
  }
})

server.applyMiddleware({
  app
})

app.listen({
  port: PORT
}, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})