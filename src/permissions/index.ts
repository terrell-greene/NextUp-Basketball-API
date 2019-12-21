import { rule, shield, and, allow } from 'graphql-shield'
import { Request } from 'express-serve-static-core'

import { Context } from '../context'
import { redisClient } from '../server'
import { AuthorizationError } from '../errors'

const getUser = async (
  req: Request
): Promise<{ userId: string; token: string }> => {
  const { authorization } = req.headers

  if (!authorization) throw new AuthorizationError()

  const token = authorization!.replace('Bearer ', '')

  const userId = await redisClient.getAsync(token)

  if (!userId) throw new AuthorizationError()

  return { userId, token }
}

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, args, { request }: Context) => {
    const { token, userId } = await getUser(request)

    request.body = {
      ...request.body,
      token,
      userId
    }

    return true
  }
)

const isDeveloper = rule({ cache: 'contextual' })(
  async (_, args, { request, db }: Context) => {
    const { userId } = await getUser(request)

    const user = await db.User.findById(userId)

    if (!user || user.role !== 'DEVELOPER') return new AuthorizationError()

    return true
  }
)

export default shield(
  {
    Query: {
      courts: allow,
      sessions: allow,
      suggestedCourts: isDeveloper
    },
    Mutation: {
      login: allow,
      signup: allow,
      createSession: isAuthenticated,
      updateSession: isAuthenticated,
      joinSession: isAuthenticated,
      unjoinSession: isAuthenticated,
      updateUser: isAuthenticated
    }
  },
  { fallbackError: new AuthorizationError() }
)
