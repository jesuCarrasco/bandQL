const {
  User
} = require('../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

require('dotenv').config()

const todos = []

const resolvers = {
  Query: {
    async me(_, args, {
      user
    }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      return await User.findById(user.id)
    },
    async myTodos(_, args, {
      user
    }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      return await todos.filter(todo => todo.userId === user.sub)
    }
  },

  Mutation: {
    async signup(_, {
      username,
      email,
      password
    }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        locale: 'es'
      })


      return jsonwebtoken.sign({
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1y'
        }
      )
    },

    async login(_, {
      email,
      password
    }) {
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      return jsonwebtoken.sign({
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
    },

    async addTodo(_, {
      title
    }, {
      user
    }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      todos.push({
        userId: user.sub,
        title
      })

      return await todos.find(todo => todo.userId === user.sub && todo.title === title)
    },

    async addLocation(_, {
      location
    }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      await User.update({
        location: `${location.x}, ${location.y}`
      }, {
        where: {
          id: user.id
        }
      })
    },

    async addSocialNetwork(_, {
      facebook,
      youtube,
      twitter,
      bandcamp
    }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      await User.update({
        facebook,
        youtube,
        twitter,
        bandcamp
      }, {
        where: {
          id: user.id
        }
      })
    }
  }
}

module.exports = resolvers