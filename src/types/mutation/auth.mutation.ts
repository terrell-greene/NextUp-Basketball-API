import { mutationField, arg } from 'nexus'
import validator from 'validator'
import { compare, hash } from 'bcryptjs'

import { LoginError, ServerError, SignUpError } from '../../errors'

import { processUpload } from '../../utils'
import { createToken } from './utils.mutation'

const { equals } = validator

export const login = mutationField('login', {
  description: 'Login a user',
  type: 'AuthPayload',
  args: {
    input: arg({ type: 'LoginInput', required: true })
  },
  resolve: async (_, { input }, { db, request }) => {
    const { username, password } = input

    const throwLoginError = () => {
      throw new LoginError({
        data: {
          password: 'Invalid username/password combination'
        }
      })
    }

    try {
      const user = await db.User.findOne({ username })

      if (!user) throwLoginError()

      const valid = await compare(password, user!.password)

      if (!valid) throwLoginError()

      const token = createToken(user!.id)

      return {
        token,
        user: user!
      }
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})

export const adminLogin = mutationField('adminLogin', {
  description: 'Login for an admin account',
  type: 'AuthPayload',
  args: { input: arg({ type: 'LoginInput', required: true }) },
  resolve: async (_, { input }, { db }) => {
    const { username, password } = input

    const throwLoginError = () => {
      throw new LoginError({
        data: {
          password: 'Invalid username/password combination'
        }
      })
    }

    try {
      const user = await db.User.findOne({ username })

      if (!user) throwLoginError()

      if (user!.role !== 'DEVELOPER') throwLoginError()

      const valid = await compare(password, user!.password)

      if (!valid) throwLoginError()

      const token = createToken(user!.id)

      return {
        token,
        user: user!
      }
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})

export const signup = mutationField('signup', {
  description: 'Sign up new user',
  type: 'AuthPayload',
  args: {
    input: arg({ type: 'SignUpInput', required: true })
  },
  resolve: async (_, { input }, { db }) => {
    const { username, password, confirmPassword, avatar } = input
    let avatarUrl = null

    if (username.split(' ').length > 1) {
      throw new SignUpError({
        data: {
          usernme: 'Password fields do not match'
        }
      })
    }

    if (!equals(password, confirmPassword)) {
      throw new SignUpError({
        data: {
          password: 'Password fields do not match'
        }
      })
    }

    try {
      const usernameExists = await db.User.findOne({ username })

      if (usernameExists) {
        throw new SignUpError({
          data: {
            username: 'Username is already in use'
          }
        })
      }

      if (avatar) {
        avatarUrl = await processUpload(avatar)
      }

      const hashedPassword = await hash(password, 10)

      const userData = { ...input, avatarUrl, password: hashedPassword }

      const newUser = await db.User.create(userData)

      const token = createToken(newUser.id)

      return {
        token,
        user: newUser
      }
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})
