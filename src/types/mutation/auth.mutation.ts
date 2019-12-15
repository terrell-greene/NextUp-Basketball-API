import { mutationField, arg } from 'nexus'
import { compare } from 'bcryptjs'

import { LoginError, ServerError } from '../../errors'
import { createSession } from './utils.mutation'

export const login = mutationField('login', {
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

      const token = await createSession({ username, userId: user!.id })

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
